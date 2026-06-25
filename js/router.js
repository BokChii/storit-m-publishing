(function () {
  const app = document.getElementById("app");
  const Screens = window.StoritScreens;
  const Modals = window.StoritModals;
  const historyStack = [];
  let current = "";

  function readHash() {
    const hash = window.location.hash.replace(/^#/, "");
    return hash || "onboarding1";
  }

  function setHash(screen) {
    if (window.location.hash.replace(/^#/, "") !== screen) {
      window.location.hash = screen;
    }
  }

  function render(screen) {
    const next = Screens.has(screen) ? screen : "home";
    const previous = current;
    current = next;
    Modals.close();
    app.innerHTML = Screens.render(next);
    const renderedScreen = app.firstElementChild;
    const suppressFrameScallop =
      renderedScreen?.classList.contains("ranking-daily-screen") ||
      renderedScreen?.classList.contains("ranking-season-screen") ||
      renderedScreen?.classList.contains("rs-yesterday-screen") ||
      renderedScreen?.classList.contains("quiz-result-screen") ||
      renderedScreen?.classList.contains("my-quiz-screen") ||
      renderedScreen?.classList.contains("quiz-create-screen") ||
      renderedScreen?.classList.contains("quiz-status-screen") ||
      renderedScreen?.classList.contains("quiz-submit-screen") ||
      renderedScreen?.classList.contains("account-withdraw-screen");
    app.classList.toggle(
      "has-scallop-frame",
      renderedScreen?.classList.contains("has-scallop") === true && !suppressFrameScallop,
    );
    app.classList.toggle("no-scallop-frame", suppressFrameScallop);
    app.scrollTop = 0;
    setHash(next);
    document.dispatchEvent(new CustomEvent("storit:render", { detail: { route: next } }));
    if (previous === "cookieReward" && next === "home") {
      openExpModalAfterRoute();
    }
  }

  function navigate(screen, options = {}) {
    if (!screen) return;
    const previous = current;
    if (current && options.push !== false && screen !== current) {
      historyStack.push(current);
    }
    render(screen);
    if ((previous === "cookieReward" && screen === "home") || options.exp === true) {
      openExpModalAfterRoute();
    }
  }

  function back(fallback) {
    if (fallback) {
      render(fallback);
      return;
    }

    const previous = historyStack.pop();
    if (previous) {
      render(previous);
      return;
    }
    render("home");
  }

  function markTermConfirmed(route) {
    if (!route) return;
    try {
      const key = "storit.acceptedTerms";
      const acceptedTerms = JSON.parse(window.sessionStorage.getItem(key) || "{}");
      acceptedTerms[route] = true;
      window.sessionStorage.setItem(key, JSON.stringify(acceptedTerms));
    } catch (error) {
      // Term confirmation is visual demo state; routing should continue even if storage is unavailable.
    }
  }

  function resetTermAcceptance() {
    try {
      window.sessionStorage.removeItem("storit.acceptedTerms");
    } catch (error) {
      // Term state is a visual demo convenience only.
    }
  }

  function openExpModalAfterRoute() {
    const open = () => {
      const modal = document.querySelector("[data-exp-modal]");
      if (modal) modal.hidden = false;
    };

    open();
    window.setTimeout(open, 0);
    window.setTimeout(open, 50);
  }

  window.addEventListener("hashchange", () => {
    const next = readHash();
    if (next !== current) render(next);
  });

  document.addEventListener("click", (event) => {
    const clickTarget = event.target.nodeType === 1 ? event.target : event.target.parentElement;
    const routeTarget = clickTarget?.closest("[data-route]");
    if (routeTarget) {
      event.preventDefault();
      if (routeTarget.disabled || routeTarget.getAttribute("aria-disabled") === "true") {
        return;
      }
      const shouldOpenMissionExp =
        routeTarget.hasAttribute("data-mission-exp") ||
        Boolean(clickTarget?.closest("[data-mission-exp]")) ||
        (readHash() === "cookieReward" && routeTarget.dataset.route === "home");
      if (routeTarget.classList.contains("auth-terms-next") && !routeTarget.classList.contains("is-ready")) {
        return;
      }
      if (routeTarget.classList.contains("auth-userinfo-next") && !routeTarget.classList.contains("is-ready")) {
        return;
      }
      if (routeTarget.dataset.termConfirm) {
        markTermConfirmed(routeTarget.dataset.termConfirm);
      }
      if (routeTarget.dataset.resetTerms === "true") {
        resetTermAcceptance();
      }
      if (shouldOpenMissionExp) {
        try {
          window.sessionStorage.setItem("storit.showMissionExp", "true");
        } catch (error) {
          window.__storitShowMissionExp = true;
        }
      }
      if (routeTarget.dataset.route === "signupWelcome") {
        const form = routeTarget.closest("[data-auth-userinfo-form]") || document;
        const nickname = form.querySelector('input[name="nickname"]')?.value.trim();
        const birthdate = form.querySelector('input[name="birthdate"]')?.value;
        const gender = form.querySelector('input[name="gender"]:checked')?.value || "";
        if (nickname) {
          try {
            window.sessionStorage.setItem("storit.nickname", nickname);
            if (birthdate) window.sessionStorage.setItem("storit.birthdate", birthdate);
            window.sessionStorage.setItem("storit.gender", gender);
          } catch (error) {
            // Session storage can be unavailable in hardened browser modes.
          }
        }
      }
      Modals.close();
      const routeDelay = routeTarget.dataset.action === "answer" ? 130 : 0;
      window.setTimeout(() => {
        navigate(routeTarget.dataset.route, { exp: shouldOpenMissionExp });
        if (shouldOpenMissionExp) {
          document.dispatchEvent(new CustomEvent("storit:mission-exp-request"));
          openExpModalAfterRoute();
        }
      }, routeDelay);
      return;
    }

    const backTarget = event.target.closest("[data-back]");
    if (backTarget) {
      event.preventDefault();
      back(backTarget.dataset.back);
      return;
    }

    const modalTarget = event.target.closest("[data-modal]");
    if (modalTarget) {
      event.preventDefault();
      Modals.open(modalTarget.dataset.modal);
      return;
    }

    if (event.target.closest("[data-close-modal]")) {
      Modals.close();
    }
  });

  window.StoritRouter = {
    start() {
      const initialScreen = readHash();
      if (initialScreen === "termsAgree") resetTermAcceptance();
      render(initialScreen);
    },
    navigate,
    back,
  };
})();
