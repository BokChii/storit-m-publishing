(function () {
  const termStorageKey = "storit.acceptedTerms";
  const assetBase = "./assets/figma-exported/named/";

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
    const exchangeScreen = target.closest(".exchange-screen");
    if (exchangeScreen) {
      const confirmButton = exchangeScreen.querySelector(".rs-sticky-action .btn");
      if (confirmButton) confirmButton.disabled = !target.classList.contains("is-checked");
    }
    const withdrawScreen = target.closest(".account-withdraw-screen");
    if (withdrawScreen) {
      const withdrawButton = withdrawScreen.querySelector(".fixed-bottom-action .btn");
      if (withdrawButton) withdrawButton.disabled = !target.classList.contains("is-checked");
    }
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

  let calendarDate = new Date(2000, 0, 1);

  function formatDate(date) {
    return String(date.getFullYear());
  }

  function formatCalendarChoice(date) {
    return `${date.getFullYear()}년 선택`;
  }

  function renderCalendar(modal) {
    const title = modal.querySelector("[data-calendar-title]");
    const grid = modal.querySelector("[data-calendar-grid]");
    const confirm = modal.querySelector("[data-calendar-confirm]");
    if (!title || !grid) return;
    const selectedYear = calendarDate.getFullYear();
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 79;
    title.textContent = "출생연도";
    if (confirm) confirm.textContent = formatCalendarChoice(calendarDate);
    const cells = [];
    for (let year = currentYear; year >= startYear; year -= 1) {
      const selected = year === selectedYear;
      cells.push(`<button class="auth-calendar-year ${selected ? "is-selected" : ""}" type="button" data-action="select-calendar-day" data-year="${year}">${year}</button>`);
    }
    grid.innerHTML = cells.join("");
    grid.querySelector(".auth-calendar-year.is-selected")?.scrollIntoView({ block: "center" });
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
    const year = Number(target.dataset.year || target.dataset.day);
    if (!Number.isFinite(year)) return;
    calendarDate = new Date(year, 0, 1);
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

  function updateAccountProfileFeedback(sheet, showEmpty = false) {
    const input = sheet?.querySelector("[data-account-profile-name]");
    const feedback = sheet?.querySelector("[data-account-profile-feedback]");
    if (!input || !feedback) return false;
    const value = input.value.trim();
    feedback.textContent = "";
    feedback.classList.remove("is-error", "is-success");
    input.classList.remove("is-error", "is-success");

    if (!value) {
      if (showEmpty) {
        feedback.textContent = "닉네임을 입력해주세요.";
        feedback.classList.add("is-error");
        input.classList.add("is-error");
      }
      return false;
    }

    if (value.length < 2 || value.length > 10) {
      feedback.textContent = "2-10자만 가능해요";
      feedback.classList.add("is-error");
      input.classList.add("is-error");
      return false;
    }

    if (value === "닉네임") {
      feedback.textContent = "이미 사용 중인 닉네임이에요.";
      feedback.classList.add("is-error");
      input.classList.add("is-error");
      return false;
    }

    feedback.textContent = "사용 가능한 닉네임이에요";
    feedback.classList.add("is-success");
    input.classList.add("is-success");
    return true;
  }

  function selectAccountProfileCookie(target) {
    const sheet = target.closest(".account-profile-edit-sheet");
    if (!sheet) return;
    sheet.querySelectorAll(".account-profile-cookie-option").forEach((option) => option.classList.remove("is-selected"));
    target.classList.add("is-selected");
    const preview = sheet.querySelector(".account-profile-edit-preview img");
    if (preview && target.dataset.profileCookie) {
      preview.src = `${assetBase}${target.dataset.profileCookie}`;
    }
  }

  function confirmAccountProfile(target) {
    const sheet = target.closest(".account-profile-edit-sheet");
    if (!sheet || !updateAccountProfileFeedback(sheet, true)) return;
    const selected = sheet.querySelector(".account-profile-cookie-option.is-selected")?.dataset.profileCookie || "profile-cookie-01.svg";
    const name = sheet.querySelector("[data-account-profile-name]")?.value.trim() || "감자도리";
    const app = document.getElementById("app");
    const avatar = app?.querySelector(".account-final-profile__avatar img");
    const title = app?.querySelector(".account-final-profile__name h2");
    if (avatar) avatar.src = `${assetBase}${selected}`;
    if (title) title.textContent = name;
    try {
      window.sessionStorage.setItem("storit.mypageProfileCookie", selected);
      window.sessionStorage.setItem("storit.mypageNickname", name);
    } catch (error) {
      // Static publishing demo state only.
    }
    window.StoritModals?.close();
  }

  function selectAccountGenre(target) {
    const sheet = target.closest(".account-genre-edit-sheet");
    if (!sheet) return;
    const selected = Array.from(sheet.querySelectorAll(".account-genre-chip.is-selected"));
    if (!target.classList.contains("is-selected") && selected.length >= 3) return;
    target.classList.toggle("is-selected");
  }

  function confirmAccountGenre(target) {
    const sheet = target.closest(".account-genre-edit-sheet");
    const selected = Array.from(sheet?.querySelectorAll(".account-genre-chip.is-selected") || []).map((chip) => chip.dataset.genre);
    const value = selected.length ? selected.join(", ") : "공포, 스릴러";
    const label = document.querySelector(".account-final-pref-grid section:nth-child(2) strong");
    if (label) label.textContent = value;
    window.StoritModals?.close();
  }

  function confirmAccountLife(target) {
    const sheet = target.closest(".account-life-edit-sheet");
    const input = sheet?.querySelector("[data-account-life-input]");
    const value = input?.value.trim() || "기자매";
    const label = document.querySelector(".account-final-pref-grid section:first-child strong");
    if (label) label.textContent = value;
    window.StoritModals?.close();
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
  const EXP_MODAL_AUTO_CLOSE_MS = 1000;

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

  function scheduleExpModalAutoClose(modal, autoCloseMs = EXP_MODAL_AUTO_CLOSE_MS) {
    if (!modal || modal.hidden) return;
    const configuredAutoCloseMs = Number(modal.dataset.expAutoCloseMs);
    const duration = Number.isFinite(configuredAutoCloseMs) && configuredAutoCloseMs > 0 ? configuredAutoCloseMs : autoCloseMs;
    clearExpModalTimer(modal);
    const openedAt = Date.now();
    const closeAfterElapsed = () => {
      const remaining = duration - (Date.now() - openedAt);
      if (remaining > 0) {
        expModalTimers.set(modal, window.setTimeout(closeAfterElapsed, remaining));
        return;
      }
      modal.hidden = true;
      expModalTimers.delete(modal);
    };
    const timer = window.setTimeout(closeAfterElapsed, duration);
    expModalTimers.set(modal, timer);
  }

  function openExpModal(modal) {
    if (!modal) return;
    clearExpModalTimer(modal);
    modal.hidden = false;
    //scheduleExpModalAutoClose(modal, autoCloseMs);
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

  function openMissionExpHome() {
    window.__storitShowMissionExp = true;
    try {
      window.sessionStorage.setItem("storit.showMissionExp", "true");
    } catch (error) {
      // The global fallback above is enough for the visual reward cue.
    }
    window.StoritRouter?.navigate("home");
    [0, 50, 150, 300].forEach((delay) => window.setTimeout(openMissionExp, delay));
  }

  function closeMissionExp(target) {
    closeExpModal(target.closest("[data-exp-modal], [data-mission-exp-modal]"));
  }

  const ATTENDANCE_BASE_EXP = 15;
  const ATTENDANCE_STREAK_BONUS_EXP = {
    3: 35,
    7: 65,
    14: 115,
    21: 165,
    28: 265,
  };

  function attendanceExpText(streak) {
    const bonusExp = ATTENDANCE_STREAK_BONUS_EXP[streak];
    return bonusExp ? `${streak}일 연속 보너스 + ${bonusExp} EXP` : `+ ${ATTENDANCE_BASE_EXP} EXP`;
  }

  function attendanceStreak(screen) {
    const configuredStreak = Number(screen?.dataset.attendanceStreak);
    if (Number.isFinite(configuredStreak) && configuredStreak > 0) return configuredStreak;
    return screen?.querySelectorAll(".hm-calendar__day.is-stamped").length || 0;
  }

  function completeAttendance(target) {
    const screen = target.closest(".hm-attendance-screen");
    if (!screen) return;

    const button = screen.querySelector('[data-action="complete-attendance"]');
    if (button) {
      button.disabled = true;
      button.classList.add("outline");
    }

    const day = screen.querySelector('[data-attendance-day="11"]');
    const stampSlot = day?.querySelector("em");
    if (day && stampSlot && !day.classList.contains("is-stamped")) {
      day.classList.add("is-stamped");
      stampSlot.innerHTML = '<img class="hm-calendar-stamp" src="./assets/figma-exported/named/attendance-cookie-stamp.svg" alt="" loading="lazy" />';
    }

    const notice = screen.querySelector("[data-attendance-notice]");
    if (notice) notice.hidden = false;

    const modal = screen.querySelector("[data-mission-exp-modal]");
    const amount = modal?.querySelector("[data-exp-amount]");
    if (amount) amount.textContent = attendanceExpText(attendanceStreak(screen));
    openExpModal(modal);
  }

  let missionBakingTimer = 0;
  let missionCookieRewardTimer = 0;
  let rewardCopyToastTimer = 0;
  let missionTickAudio = null;
  let missionDingAudio = null;
  let missionAudioUnlocked = false;
  let missionTickPlaying = false;
  let shouldDingOnCookieComplete = false;
  let shouldRewardOnCookieComplete = false;
  const missionAudioFiles = {
    tick: "./assets/audio/tiktok.mp3",
    ding: "./assets/audio/tting.mp3",
  };

  function currentRoute() {
    return window.location.hash.replace(/^#/, "") || "onboarding1";
  }
  function syncRewardCopyToast() {
    window.clearTimeout(rewardCopyToastTimer);

    if (currentRoute() !== "rewardCopied") return;
    rewardCopyToastTimer = window.setTimeout(() => {
     if (currentRoute() === "rewardCopied") {
      window.StoritRouter?.navigate("rewardDetail");
    }
  }, 1000);
}

  function stopMissionBakingTimers() {
    if (missionBakingTimer) {
      window.clearTimeout(missionBakingTimer);
      missionBakingTimer = 0;
    }
    stopMissionTick();
  }

  function stopMissionCookieRewardTimer() {
    if (missionCookieRewardTimer) {
      window.clearTimeout(missionCookieRewardTimer);
      missionCookieRewardTimer = 0;
    }
  }

  function getMissionAudio(type) {
    if (typeof window.Audio !== "function") return null;
    if (type === "tick" && missionTickAudio) return missionTickAudio;
    if (type === "ding" && missionDingAudio) return missionDingAudio;

    const audio = new window.Audio(missionAudioFiles[type]);
    audio.preload = "auto";
    audio.loop = type === "tick";
    audio.volume = type === "tick" ? 0.65 : 0.9;

    if (type === "tick") missionTickAudio = audio;
    if (type === "ding") missionDingAudio = audio;
    return audio;
  }

  function unlockMissionAudio() {
    if (missionAudioUnlocked) return;
    missionAudioUnlocked = true;
    getMissionAudio("tick")?.load();
    getMissionAudio("ding")?.load();
  }

  function playMissionTick() {
    unlockMissionAudio();
    const audio = getMissionAudio("tick");
    if (!audio || missionTickPlaying) return;
    missionTickPlaying = true;
    audio.currentTime = 0;
    const playResult = audio.play();
    if (playResult?.catch) {
      playResult.catch(() => {
        missionTickPlaying = false;
      });
    }
  }

  function stopMissionTick() {
    const audio = missionTickAudio;
    missionTickPlaying = false;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
  }

  function playMissionDing() {
    unlockMissionAudio();
    const audio = getMissionAudio("ding");
    if (!audio) return;
    audio.currentTime = 0;
    const playResult = audio.play();
    if (playResult?.catch) playResult.catch(() => {});
  }

  function startMissionBakingFlow() {
    stopMissionBakingTimers();
    playMissionTick();
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
    if (action === "select-account-profile-cookie") selectAccountProfileCookie(actionTarget);
    if (action === "confirm-account-profile") confirmAccountProfile(actionTarget);
    if (action === "select-account-genre") selectAccountGenre(actionTarget);
    if (action === "confirm-account-genre") confirmAccountGenre(actionTarget);
    if (action === "confirm-account-life") confirmAccountLife(actionTarget);
    if (action === "close-notification-permission") closeNotificationPermission(actionTarget);
    if (action === "complete-notification-permission") completeNotificationPermission();
    if (action === "open-heart-charge") openHeartCharge(actionTarget);
    if (action === "close-heart-charge") closeHeartCharge(actionTarget);
    if (action === "close-mission-exp") closeMissionExp(actionTarget);
    if (action === "open-mission-exp-home") openMissionExpHome();
    if (action === "complete-attendance") completeAttendance(actionTarget);
    if (action === "copy-invite-code") {
      event.preventDefault();
      window.StoritModals?.copyInviteCode?.();
    }
  });

  document.addEventListener("input", (event) => {
    const form = event.target.closest("[data-auth-userinfo-form]");
    if (form) updateUserInfoState(form);
    const accountSheet = event.target.closest(".account-profile-edit-sheet");
    if (accountSheet && event.target.matches("[data-account-profile-name]")) updateAccountProfileFeedback(accountSheet, false);
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
//    watchExpModals();
    syncMissionFlowSideEffects();
    openMissionExpIfQueued();
  });

  window.addEventListener("hashchange", syncMissionFlowSideEffects);
  window.addEventListener("hashchange", openMissionExpIfQueued);
  window.addEventListener("hashchange", syncRewardCopyToast);
  document.addEventListener("storit:render", openMissionExpIfQueued);
  document.addEventListener("storit:render", syncRewardCopyToast);
  document.addEventListener("storit:mission-exp-request", openMissionExp);
})();
