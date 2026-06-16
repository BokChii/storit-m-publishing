(function () {
  const termStorageKey = "storit.acceptedTerms";

  function readAcceptedTerms() {
    try {
      return JSON.parse(window.sessionStorage.getItem(termStorageKey) || "{}");
    } catch (error) {
      return {};
    }
  }

  function writeAcceptedTerms(nextTerms) {
    try {
      window.sessionStorage.setItem(termStorageKey, JSON.stringify(nextTerms));
    } catch (error) {
      // Session storage is only a demo convenience; visual state still works without it.
    }
  }

  function persistTermsFromScreen(screen) {
    const nextTerms = readAcceptedTerms();
    screen.querySelectorAll(".auth-terms-row-check").forEach((button) => {
      if (button.dataset.termRoute) {
        nextTerms[button.dataset.termRoute] = button.classList.contains("is-checked");
      }
    });
    writeAcceptedTerms(nextTerms);
  }

  function toggleCheck(target) {
    target.classList.toggle("is-checked");
  }

  function setCheckedClass(target, checked) {
    if (checked) {
      target.classList.add("is-checked");
      target.setAttribute("aria-pressed", "true");
      target.closest(".auth-terms-agree-row")?.classList.add("is-checked");
      return;
    }
    target.classList.remove("is-checked");
    target.setAttribute("aria-pressed", "false");
    target.closest(".auth-terms-agree-row")?.classList.remove("is-checked");
  }

  function updateTermsState(screen) {
    const allButton = screen.querySelector(".auth-terms-all");
    const rowButtons = Array.from(screen.querySelectorAll(".auth-terms-row-check"));
    const allChecked = rowButtons.length > 0 && rowButtons.every((button) => button.classList.contains("is-checked"));
    const requiredButtons = rowButtons.filter((button) => button.dataset.required === "true");
    const requiredChecked = requiredButtons.length > 0 && requiredButtons.every((button) => button.classList.contains("is-checked"));

    if (allButton) setCheckedClass(allButton, allChecked);
    const nextButton = screen.querySelector(".auth-terms-next");
    if (nextButton) {
      nextButton.classList.toggle("is-ready", requiredChecked);
      nextButton.disabled = !requiredChecked;
    }
  }

  function toggleTermsAll(target) {
    const screen = target.closest(".auth-terms-agree-screen");
    if (!screen) return;
    const nextChecked = !target.classList.contains("is-checked");
    setCheckedClass(target, nextChecked);
    screen.querySelectorAll(".auth-terms-row-check").forEach((button) => setCheckedClass(button, nextChecked));
    persistTermsFromScreen(screen);
    updateTermsState(screen);
  }

  function toggleTermsRow(target) {
    const screen = target.closest(".auth-terms-agree-screen");
    if (!screen) return;
    setCheckedClass(target, !target.classList.contains("is-checked"));
    persistTermsFromScreen(screen);
    updateTermsState(screen);
  }

  function toggleSwitch(target) {
    const toggle = target.querySelector(".toggle");
    if (toggle) toggle.classList.toggle("is-on");
  }

  function selectAnswer(target) {
    const list = target.closest(".answer-list");
    if (!list) return;
    list.querySelectorAll(".answer").forEach((answer) => answer.classList.remove("is-selected"));
    target.classList.add("is-selected");
  }

  function updateUserInfoState(form) {
    if (!form) return false;
    const nickname = form.querySelector('input[name="nickname"]');
    const birthdate = form.querySelector('input[name="birthdate"]');
    const gender = form.querySelector('input[name="gender"]:checked');
    const nicknameValid = validateNickname(form, false);
    const ready = Boolean(nicknameValid && birthdate?.value && gender);
    const nextButton = form.querySelector(".auth-userinfo-next");
    if (nextButton) {
      nextButton.classList.toggle("is-ready", ready);
      nextButton.disabled = !ready;
    }
    if (ready) form.classList.remove("is-submitted");
    return ready;
  }

  function persistUserInfo(form) {
    try {
      const nickname = form.querySelector('input[name="nickname"]')?.value.trim();
      const birthdate = form.querySelector('input[name="birthdate"]')?.value;
      const gender = form.querySelector('input[name="gender"]:checked')?.value || "";
      if (nickname) window.sessionStorage.setItem("storit.nickname", nickname);
      if (birthdate) window.sessionStorage.setItem("storit.birthdate", birthdate);
      window.sessionStorage.setItem("storit.gender", gender);
    } catch (error) {
      // Signup form state is only used for the static demo flow.
    }
  }

  function validateNickname(form, showEmpty = true) {
    const nickname = form?.querySelector('input[name="nickname"]');
    const feedback = form?.querySelector("[data-nickname-feedback]");
    if (!nickname || !feedback) return false;
    const value = nickname.value.trim();
    feedback.textContent = "";
    feedback.classList.remove("is-error", "is-success");
    nickname.closest(".auth-userinfo-field")?.classList.remove("is-invalid", "is-valid");

    if (!value) {
      if (showEmpty) {
        feedback.textContent = "닉네임을 입력해주세요.";
        feedback.classList.add("is-error");
      }
      return false;
    }
    if (value.length < 2 || value.length > 10) {
      feedback.textContent = "2-10자만 가능해요.";
      feedback.classList.add("is-error");
      nickname.closest(".auth-userinfo-field")?.classList.add("is-invalid");
      return false;
    }
    if (value === "닉네임") {
      feedback.textContent = "이미 사용 중인 닉네임이에요.";
      feedback.classList.add("is-error");
      nickname.closest(".auth-userinfo-field")?.classList.add("is-invalid");
      return false;
    }
    feedback.textContent = "사용 가능한 닉네임이에요.";
    feedback.classList.add("is-success");
    nickname.closest(".auth-userinfo-field")?.classList.add("is-valid");
    return true;
  }

  let calendarDate = new Date(2026, 5, 12);

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function formatCalendarChoice(date) {
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 선택`;
  }

  function renderCalendar(modal) {
    const title = modal.querySelector("[data-calendar-title]");
    const grid = modal.querySelector("[data-calendar-grid]");
    const confirm = modal.querySelector("[data-calendar-confirm]");
    if (!title || !grid) return;
    const year = calendarDate.getFullYear();
    const month = calendarDate.getMonth();
    title.textContent = `${year}년 ${month + 1}월`;
    if (confirm) confirm.textContent = formatCalendarChoice(calendarDate);
    const firstDay = new Date(year, month, 1).getDay();
    const days = new Date(year, month + 1, 0).getDate();
    const cells = [];
    const previousMonthDays = new Date(year, month, 0).getDate();
    for (let index = 0; index < firstDay; index += 1) {
      const day = previousMonthDays - firstDay + index + 1;
      cells.push(`<span class="auth-calendar-day is-muted">${day}</span>`);
    }
    for (let day = 1; day <= days; day += 1) {
      const selected = day === calendarDate.getDate();
      cells.push(`<button class="auth-calendar-day ${selected ? "is-selected" : ""}" type="button" data-action="select-calendar-day" data-day="${day}">${day}</button>`);
    }
    grid.innerHTML = cells.join("");
  }

  function openCalendar(trigger) {
    const screen = trigger.closest(".auth-userinfo-screen");
    const modal = screen?.querySelector("[data-calendar-modal]");
    if (!modal) return;
    modal.hidden = false;
    renderCalendar(modal);
  }

  function closeCalendar(target) {
    target.closest("[data-calendar-modal]")?.setAttribute("hidden", "");
  }

  function selectCalendarDay(target) {
    const modal = target.closest("[data-calendar-modal]");
    const day = Number(target.dataset.day);
    if (!Number.isFinite(day)) return;
    calendarDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), day);
    if (modal) renderCalendar(modal);
  }

  function confirmCalendarDate(target) {
    const modal = target.closest("[data-calendar-modal]");
    const screen = target.closest(".auth-userinfo-screen");
    const input = screen?.querySelector("[data-birth-input]");
    if (input) {
      input.value = formatDate(calendarDate);
      input.dispatchEvent(new Event("input", { bubbles: true }));
    }
    if (modal) modal.hidden = true;
  }

  function openProfilePicker(trigger) {
    const modal = trigger.closest(".auth-userinfo-screen")?.querySelector("[data-profile-picker-modal]");
    if (modal) modal.hidden = false;
  }

  function closeProfilePicker(target) {
    target.closest("[data-profile-picker-modal]")?.setAttribute("hidden", "");
  }

  function selectProfileCookie(target) {
    const modal = target.closest("[data-profile-picker-modal]");
    if (!modal) return;
    modal.querySelectorAll(".auth-profile-option").forEach((option) => option.classList.remove("is-selected"));
    target.classList.add("is-selected");
    const preview = modal.querySelector(".auth-profile-preview__image");
    if (preview && target.dataset.profileCookie) {
      preview.src = `./assets/figma-exported/named/${target.dataset.profileCookie}`;
    }
  }

  function confirmProfileCookie(target) {
    const modal = target.closest("[data-profile-picker-modal]");
    const screen = target.closest(".auth-userinfo-screen");
    const selected = modal?.querySelector(".auth-profile-option.is-selected")?.dataset.profileCookie;
    if (!selected || !screen) return;
    try {
      window.sessionStorage.setItem("storit.profileCookie", selected);
    } catch (error) {
      // Visual demo state only.
    }
    const image = screen.querySelector(".auth-userinfo-cookie");
    if (image) image.src = `./assets/figma-exported/named/${selected}`;
    modal.hidden = true;
  }

  function openNotificationPermission(form) {
    const modal = form.closest(".auth-userinfo-screen")?.querySelector("[data-notification-modal]");
    if (modal) modal.hidden = false;
  }

  function closeNotificationPermission(target) {
    target.closest("[data-notification-modal]")?.setAttribute("hidden", "");
  }

  function completeNotificationPermission() {
    window.location.hash = "signupWelcome";
  }

  function openHeartCharge(trigger) {
    const modal = trigger.closest(".hm-home-screen")?.querySelector("[data-heart-charge-modal]");
    if (modal) modal.hidden = false;
  }

  function closeHeartCharge(target) {
    target.closest("[data-heart-charge-modal]")?.setAttribute("hidden", "");
  }

  const expModalTimers = new WeakMap();

  function clearExpModalTimer(modal) {
    const timer = expModalTimers.get(modal);
    if (!timer) return;
    window.clearTimeout(timer);
    expModalTimers.delete(modal);
  }

  function closeExpModal(modal) {
    if (!modal) return;
    clearExpModalTimer(modal);
    modal.hidden = true;
  }

  function scheduleExpModalAutoClose(modal) {
    if (!modal || modal.hidden) return;
    clearExpModalTimer(modal);
    const openedAt = Date.now();
    const closeAfterElapsed = () => {
      const remaining = 1000 - (Date.now() - openedAt);
      if (remaining > 0) {
        expModalTimers.set(modal, window.setTimeout(closeAfterElapsed, remaining));
        return;
      }
      modal.hidden = true;
      expModalTimers.delete(modal);
    };
    const timer = window.setTimeout(closeAfterElapsed, 1000);
    expModalTimers.set(modal, timer);
  }

  function openExpModal(modal) {
    if (!modal) return;
    modal.hidden = false;
    scheduleExpModalAutoClose(modal);
  }

  function watchExpModals() {
    document.querySelectorAll("[data-exp-modal]").forEach(scheduleExpModalAutoClose);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes") {
          const target = mutation.target;
          if (target.matches?.("[data-exp-modal]")) scheduleExpModalAutoClose(target);
          return;
        }

        mutation.addedNodes.forEach((node) => {
          if (node.nodeType !== 1) return;
          if (node.matches?.("[data-exp-modal]")) scheduleExpModalAutoClose(node);
          node.querySelectorAll?.("[data-exp-modal]").forEach(scheduleExpModalAutoClose);
        });
      });
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["hidden"],
      childList: true,
      subtree: true,
    });
  }

  function shouldOpenMissionExp() {
    if (window.__storitShowMissionExp) {
      window.__storitShowMissionExp = false;
      return true;
    }
    try {
      if (window.sessionStorage.getItem("storit.showMissionExp") === "true") {
        window.sessionStorage.removeItem("storit.showMissionExp");
        return true;
      }
    } catch (error) {
      // The popup is a visual reward cue; missing storage should not block routing.
    }
    return false;
  }

  function openMissionExpIfQueued() {
    if (currentRoute() !== "home" || !shouldOpenMissionExp()) return;
    openMissionExp();
  }

  function openMissionExp() {
    const modal = document.querySelector("[data-mission-exp-modal]");
    openExpModal(modal);
  }

  function closeMissionExp(target) {
    closeExpModal(target.closest("[data-exp-modal], [data-mission-exp-modal]"));
  }

  let missionBakingTimer = 0;
  let missionBakingTickTimer = 0;
  let missionCookieRewardTimer = 0;
  let missionAudioContext = null;
  let shouldDingOnCookieComplete = false;
  let shouldRewardOnCookieComplete = false;

  function currentRoute() {
    return window.location.hash.replace(/^#/, "") || "onboarding1";
  }

  function stopMissionBakingTimers() {
    if (missionBakingTimer) {
      window.clearTimeout(missionBakingTimer);
      missionBakingTimer = 0;
    }
    if (missionBakingTickTimer) {
      window.clearInterval(missionBakingTickTimer);
      missionBakingTickTimer = 0;
    }
  }

  function stopMissionCookieRewardTimer() {
    if (missionCookieRewardTimer) {
      window.clearTimeout(missionCookieRewardTimer);
      missionCookieRewardTimer = 0;
    }
  }

  function getMissionAudioContext() {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;
    if (!missionAudioContext) missionAudioContext = new AudioContextClass();
    if (missionAudioContext.state === "suspended") {
      missionAudioContext.resume().catch(() => {});
    }
    return missionAudioContext;
  }

  function missionToneDataUrl(frequency, duration, options = {}) {
    if (typeof window.btoa !== "function") return "";
    const sampleRate = 8000;
    const sampleCount = Math.max(1, Math.floor(sampleRate * duration));
    const bytes = new Uint8Array(44 + sampleCount * 2);
    const view = new DataView(bytes.buffer);
    const writeString = (offset, value) => {
      for (let index = 0; index < value.length; index += 1) {
        bytes[offset + index] = value.charCodeAt(index);
      }
    };
    writeString(0, "RIFF");
    view.setUint32(4, 36 + sampleCount * 2, true);
    writeString(8, "WAVE");
    writeString(12, "fmt ");
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    writeString(36, "data");
    view.setUint32(40, sampleCount * 2, true);

    const volume = options.volume || 0.08;
    const fadeSamples = Math.max(1, Math.floor(sampleRate * 0.01));
    for (let index = 0; index < sampleCount; index += 1) {
      const phase = (2 * Math.PI * frequency * index) / sampleRate;
      const wave = options.type === "square" ? (Math.sin(phase) >= 0 ? 1 : -1) : Math.sin(phase);
      const fadeIn = Math.min(1, index / fadeSamples);
      const fadeOut = Math.min(1, (sampleCount - index) / fadeSamples);
      const sample = Math.max(-1, Math.min(1, wave * volume * fadeIn * fadeOut));
      view.setInt16(44 + index * 2, sample * 32767, true);
    }

    let binary = "";
    const chunkSize = 4096;
    for (let index = 0; index < bytes.length; index += chunkSize) {
      binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize));
    }
    return `data:audio/wav;base64,${window.btoa(binary)}`;
  }

  function playMissionFallbackTone(frequency, duration, options = {}) {
    if (typeof window.Audio !== "function") return;
    const dataUrl = missionToneDataUrl(frequency, duration, options);
    if (!dataUrl) return;
    const audio = new window.Audio(dataUrl);
    const playResult = audio.play();
    if (playResult?.catch) playResult.catch(() => {});
  }

  function playMissionTone(frequency, duration = 0.08, options = {}) {
    const context = getMissionAudioContext();
    if (!context) {
      playMissionFallbackTone(frequency, duration, options);
      return;
    }
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const now = context.currentTime;
    oscillator.type = options.type || "sine";
    oscillator.frequency.setValueAtTime(frequency, now);
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(options.volume || 0.08, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(now);
    oscillator.stop(now + duration + 0.02);
  }

  function unlockMissionAudio() {
    const context = getMissionAudioContext();
    if (!context) return;
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const now = context.currentTime;
    oscillator.frequency.setValueAtTime(440, now);
    gain.gain.setValueAtTime(0.001, now);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(now);
    oscillator.stop(now + 0.01);
  }

  function playMissionTick() {
    playMissionTone(1050, 0.055, { type: "square", volume: 0.035 });
  }

  function playMissionDing() {
    playMissionTone(988, 0.12, { volume: 0.06 });
    window.setTimeout(() => playMissionTone(1319, 0.18, { volume: 0.075 }), 95);
  }

  function startMissionBakingFlow() {
    stopMissionBakingTimers();
    playMissionTick();
    missionBakingTickTimer = window.setInterval(playMissionTick, 650);
    missionBakingTimer = window.setTimeout(() => {
      stopMissionBakingTimers();
      shouldDingOnCookieComplete = true;
      shouldRewardOnCookieComplete = true;
      window.StoritRouter?.navigate("cookieComplete");
    }, 3000);
  }

  function startMissionCookieRewardFlow() {
    stopMissionCookieRewardTimer();
    missionCookieRewardTimer = window.setTimeout(() => {
      stopMissionCookieRewardTimer();
      shouldRewardOnCookieComplete = false;
      window.StoritRouter?.navigate("cookieReward");
    }, 2300);
  }

  function syncMissionFlowSideEffects() {
    const route = currentRoute();
    if (route !== "baking") stopMissionBakingTimers();
    if (route !== "cookieComplete") stopMissionCookieRewardTimer();
    if (route === "baking") {
      startMissionBakingFlow();
      return;
    }
    if (route === "cookieComplete" && shouldDingOnCookieComplete) {
      shouldDingOnCookieComplete = false;
      window.setTimeout(playMissionDing, 60);
    }
    if (route === "cookieComplete" && shouldRewardOnCookieComplete) {
      startMissionCookieRewardFlow();
    }
  }

  document.addEventListener(
    "pointerdown",
    (event) => {
      if (event.target.closest('[data-route="baking"]')) unlockMissionAudio();
    },
    { capture: true },
  );

  document.addEventListener("click", (event) => {
    const termsAll = event.target.closest(".auth-terms-all");
    if (termsAll) {
      event.preventDefault();
      toggleTermsAll(termsAll);
      return;
    }

    const termsRow = event.target.closest(".auth-terms-row-check");
    if (termsRow) {
      event.preventDefault();
      toggleTermsRow(termsRow);
      return;
    }

    const termsAgreeRow = event.target.closest(".auth-terms-agree-row");
    if (termsAgreeRow && !event.target.closest(".auth-terms-row-more")) {
      event.preventDefault();
      const rowCheck = termsAgreeRow.querySelector(".auth-terms-row-check");
      if (rowCheck) toggleTermsRow(rowCheck);
      return;
    }

    const actionTarget = event.target.closest("[data-action]");
    if (!actionTarget) return;

    const action = actionTarget.dataset.action;
    if (action === "check") toggleCheck(actionTarget);
    if (action === "toggle") toggleSwitch(actionTarget);
    if (action === "answer") selectAnswer(actionTarget);
    if (action === "open-calendar") openCalendar(actionTarget);
    if (action === "close-calendar") closeCalendar(actionTarget);
    if (action === "select-calendar-day") selectCalendarDay(actionTarget);
    if (action === "confirm-calendar-date") confirmCalendarDate(actionTarget);
    if (action === "open-profile-picker") openProfilePicker(actionTarget);
    if (action === "close-profile-picker") closeProfilePicker(actionTarget);
    if (action === "select-profile-cookie") selectProfileCookie(actionTarget);
    if (action === "confirm-profile-cookie") confirmProfileCookie(actionTarget);
    if (action === "close-notification-permission") closeNotificationPermission(actionTarget);
    if (action === "complete-notification-permission") completeNotificationPermission();
    if (action === "open-heart-charge") openHeartCharge(actionTarget);
    if (action === "close-heart-charge") closeHeartCharge(actionTarget);
    if (action === "close-mission-exp") closeMissionExp(actionTarget);
    if (action === "open-mission-exp-home") window.setTimeout(openMissionExp, 0);
    if (action === "copy-invite-code") {
      event.preventDefault();
      window.StoritModals?.copyInviteCode?.();
    }
  });

  document.addEventListener("input", (event) => {
    const form = event.target.closest("[data-auth-userinfo-form]");
    if (form) updateUserInfoState(form);
  });

  document.addEventListener("change", (event) => {
    const form = event.target.closest("[data-auth-userinfo-form]");
    if (form) updateUserInfoState(form);
  });

  document.addEventListener("submit", (event) => {
    const form = event.target.closest("[data-auth-userinfo-form]");
    if (!form) return;
    event.preventDefault();
    if (!updateUserInfoState(form)) {
      form.classList.add("is-submitted");
      validateNickname(form, true);
      return;
    }
    persistUserInfo(form);
    openNotificationPermission(form);
  });

  document.addEventListener("DOMContentLoaded", () => {
    window.StoritRouter.start();
    watchExpModals();
    syncMissionFlowSideEffects();
    openMissionExpIfQueued();
  });

  window.addEventListener("hashchange", syncMissionFlowSideEffects);
  window.addEventListener("hashchange", openMissionExpIfQueued);
  document.addEventListener("storit:render", openMissionExpIfQueued);
  document.addEventListener("storit:mission-exp-request", openMissionExp);
})();
