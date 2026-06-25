(function () {
  const D = window.StoritData;
  const C = window.StoritComponents;
  const assetBase = "./assets/figma-exported/named/";

  function loadHomeMissionStyles() {
    const href = "./css/home-mission.css?v=goal-fidelity-20260617b";
    if (!document.querySelector || !document.createElement || !document.head) return;
    if (document.querySelector('link[href^="./css/home-mission.css"]')) return;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  }

  loadHomeMissionStyles();

  const quickItems = [
    { label: "오늘의 미션", icon: "homeMission", route: "mission" },
    { label: "출석체크", icon: "homeAttendance", route: "attendance" },
    { label: "친구 초대", icon: "homeInvite", modal: "invite" },
    { label: "내 퀴즈", icon: "homeMyQuiz", route: "myQuiz" },
  ];
  const HOME_DEMO_HEART_MAX = 2;
  const HOME_DEMO_HEARTS_KEY = "storit.demo.home.hearts";
  const HOME_DEMO_COMPLETED_KEY = "storit.demo.home.completedQuizIds";
  const HOME_DEMO_PENDING_KEY = "storit.demo.home.pendingQuizId";

  function readHomeDemoHearts() {
    try {
      const stored = Number(window.sessionStorage.getItem(HOME_DEMO_HEARTS_KEY));
      return Number.isFinite(stored) ? Math.max(0, Math.min(HOME_DEMO_HEART_MAX, stored)) : HOME_DEMO_HEART_MAX;
    } catch (error) {
      return HOME_DEMO_HEART_MAX;
    }
  }

  function writeHomeDemoHearts(count) {
    try {
      window.sessionStorage.setItem(HOME_DEMO_HEARTS_KEY, String(Math.max(0, Math.min(HOME_DEMO_HEART_MAX, count))));
    } catch (error) {
      // Demo-only visual state.
    }
  }

  function readCompletedQuizIds() {
    try {
      const ids = JSON.parse(window.sessionStorage.getItem(HOME_DEMO_COMPLETED_KEY) || "[]");
      return Array.isArray(ids) ? ids : [];
    } catch (error) {
      return [];
    }
  }

  function addCompletedQuizId(quizId) {
    if (!quizId) return;
    const ids = readCompletedQuizIds();
    if (!ids.includes(quizId)) ids.push(quizId);
    try {
      window.sessionStorage.setItem(HOME_DEMO_COMPLETED_KEY, JSON.stringify(ids));
    } catch (error) {
      // Demo-only visual state.
    }
  }

  function writePendingQuizId(quizId) {
    try {
      if (quizId) window.sessionStorage.setItem(HOME_DEMO_PENDING_KEY, quizId);
      else window.sessionStorage.removeItem(HOME_DEMO_PENDING_KEY);
    } catch (error) {
      // Demo-only visual state.
    }
  }

  function readPendingQuizId() {
    try {
      return window.sessionStorage.getItem(HOME_DEMO_PENDING_KEY) || "";
    } catch (error) {
      return "";
    }
  }

  function iconBubble(icon, className = "") {
    return `<span class="hm-icon-bubble ${className}" aria-hidden="true">${C.icon(icon)}</span>`;
  }

  function namedAsset(file, className = "", alt = "") {
    return `<img class="${className}" src="${assetBase}${C.escape(file)}" alt="${C.escape(alt)}" loading="lazy" />`;
  }

  function statChip(label, value, className = "") {
    return `
      <span class="hm-stat-chip ${className}">
        <small>${C.escape(label)}</small>
        <strong>${C.escape(value)}</strong>
      </span>
    `;
  }

  function sectionHeading(title, actionLabel, route) {
    return `
      <div class="hm-section-heading">
        <h2>${C.escape(title)}</h2>
        ${route ? `<button type="button" data-route="${C.escape(route)}">${C.escape(actionLabel || "전체보기")}</button>` : ""}
      </div>
    `;
  }

  function profileBar() {
    const hearts = readHomeDemoHearts();
    const heartIcons = Array.from({ length: HOME_DEMO_HEART_MAX }, (_, index) =>
      index < hearts ? C.icon("homeHeart") : `<span class="hm-heart-set__empty">${C.icon("homeHeart")}</span>`,
    ).join("");
    const timeText = hearts >= HOME_DEMO_HEART_MAX ? "하트 MAX!!" : "28:45 남음";

    return `
      <header class="hm-profilebar" aria-label="내 프로필">
        <div class="hm-profilebar__avatar">${C.icon("homeProfileAvatar")}</div>
        <div class="hm-profilebar__meta">
          <strong class="hm-profilebar__name">${C.escape(D.user.name)} LV.${D.user.level}</strong>
          <div class="hm-exp-bar" aria-label="경험치 ${D.user.progress}%">
            ${namedAsset("home-exp-bar.svg", "hm-exp-bar__image")}
            <span>${D.user.progress}%</span>
          </div>
        </div>
        <div class="hm-heart-set" aria-label="하트">
          ${heartIcons}
          <button class="hm-heart-set__plus" type="button" data-action="open-heart-charge" aria-label="하트 충전">+</button>
          <span class="hm-time-pill">${C.escape(timeText)}</span>
        </div>
        <div class="hm-profilebar__actions">
          <span class="hm-cookie-pill">${namedAsset("home-cookie-pill-cookie.svg", "hm-cookie-pill__icon")} <strong>602</strong></span>
          <button class="hm-mail-button" type="button" data-route="notifications" aria-label="알림">
            ${C.icon("homeMail")}
            <span class="hm-mail-dot" aria-hidden="true"></span>
          </button>
        </div>
      </header>
    `;
  }

  function homeBanner() {
    return `
      <section class="hm-home-banner" aria-label="오늘의 미션 배너">
        <span class="hm-home-banner__page" aria-hidden="true">1/3</span>
        <div class="hm-home-banner__copy">
          <h1>매일 퀴즈 풀고<br /><mark>쿠키</mark> 받아가세요</h1>
          <button class="hm-compact-button hm-compact-button--dark" type="button" data-route="mission">오늘의 미션 보기 <span aria-hidden="true">›</span></button>
        </div>
        <div class="hm-home-banner__chef">
          <img src="${assetBase}home-banner-cookie.svg" alt="" loading="lazy" />
        </div>
      </section>
    `;
  }

  function quickMenu() {
    return `
      <nav class="hm-quick-menu" aria-label="빠른 메뉴">
        ${quickItems
          .map(
            (item) => `
              <button
                class="hm-quick-menu__item"
                type="button"
                ${item.route ? `data-route="${C.escape(item.route)}"` : ""}
                ${item.modal ? `data-modal="${C.escape(item.modal)}"` : ""}
              >
                ${iconBubble(item.icon)}
                <span>${C.escape(item.label)}</span>
              </button>
            `,
          )
          .join("")}
      </nav>
    `;
  }

  function miniIngredientStrip() {
    return `
      <div class="hm-mini-ingredients" aria-label="재료 진행 현황">
        ${D.ingredients
          .map(
            (item) => `
              <span class="${item.done ? "is-done" : ""}">
                ${iconBubble(item.icon)}
                <small>${C.escape(item.name)}</small>
              </span>
            `,
          )
          .join("")}
      </div>
    `;
  }

  function missionPreviewCard() {
    const completeCount = D.ingredients.filter((item) => item.done).length;
    return `
      <article class="hm-mission-preview" data-route="mission">
        <div>
          <p class="hm-kicker">✦ 오늘의 쿠키 레시피 ✦</p>
          <h2>초코칩 쿠키 만들기</h2>
          <p>재료 ${completeCount}/${D.ingredients.length}개를 모았어요</p>
        </div>
        <strong class="hm-progress-ring" aria-label="미션 진행률">${completeCount}/${D.ingredients.length}</strong>
        ${miniIngredientStrip()}
      </article>
    `;
  }

  function rankingPreview() {
    return `
      <section class="hm-list-section hm-ranking-preview" aria-label="랭킹 미리보기">
        ${sectionHeading("실시간 랭킹", "랭킹 보기", "rankingDaily")}
        <div class="hm-ranking-list">
          ${D.ranking
            .slice(0, 3)
            .map(
              ([name, score, change], index) => `
                <article class="hm-ranking-row ${index === 0 ? "is-top" : ""}">
                  <strong>${index + 1}</strong>
                  <span>${C.escape(name)}</span>
                  <em>${C.escape(score)}</em>
                  <small>${C.escape(change)}</small>
                </article>
              `,
            )
            .join("")}
        </div>
      </section>
    `;
  }

  function quizChanceBanner() {
    return `
      <section class="hm-chance-banner" aria-label="오늘의 퀴즈 기회">
        <span class="hm-chance-cookie">${C.icon("homeQuizCookie")}</span>
        <div class="hm-chance-banner__copy">
          <strong>오늘의 퀴즈</strong>
          <span>무료 기회 2회</span>
        </div>
        <div class="hm-chance-banner__right">
          <strong>웹툰 퀴즈 풀면 최대 5,000원!</strong>
          <span>30분 마다 무료 기회 1회</span>
        </div>
      </section>
    `;
  }

  function heartChargeModal() {
    const hearts = readHomeDemoHearts();
    const modalHearts = Array.from({ length: HOME_DEMO_HEART_MAX }, (_, index) =>
      namedAsset(index < hearts ? "heart-modal-full-heart.svg" : "heart-modal-empty-heart.svg", "hm-heart-modal__empty-heart"),
    ).join("");

    return `
      <div class="hm-heart-modal" data-heart-charge-modal hidden>
        <div class="hm-heart-modal__dim" data-action="close-heart-charge"></div>
        <section class="hm-heart-modal__sheet" role="dialog" aria-modal="true" aria-label="하트 충전">
          <button class="storit-modal-close hm-heart-modal__close" type="button" data-action="close-heart-charge" aria-label="닫기">×</button>
          <div class="hm-heart-modal__hero">
            ${namedAsset("heart-modal-cookie.svg", "hm-heart-modal__cookie")}
          </div>
          <h2>하트를 충전하세요!</h2>
          <div class="hm-heart-modal__status" aria-label="하트 충전 상태">
            <span class="hm-heart-modal__time">28:35 남음</span>
            ${modalHearts}
            <button class="hm-heart-modal__plus" type="button" aria-label="하트 충전 추가">
              ${namedAsset("heart-modal-plus.svg", "hm-heart-modal__plus-icon")}
            </button>
          </div>
          <p>광고를 시청하면 하트 1개를 즉시 충전할 수 있어요!</p>
          <div class="hm-heart-modal__count">
            ${namedAsset("heart-modal-video.svg", "hm-heart-modal__video")}
            <strong>오늘 남은 광고 충전 횟수 7 / 10</strong>
          </div>
          <div class="hm-heart-modal__actions">
            <button type="button" class="hm-heart-modal__button hm-heart-modal__button--wait" data-action="close-heart-charge">기다리기</button>
            <button type="button" class="hm-heart-modal__button hm-heart-modal__button--watch" data-action="watch-heart-ad">보러가기</button>
          </div>
        </section>
      </div>
    `;
  }

  function consumeQueuedMissionExp() {
    if (window.__storitShowMissionExp) {
      window.__storitShowMissionExp = false;
      try {
        window.sessionStorage.removeItem("storit.showMissionExp");
      } catch (error) {
        // The popup state is a visual-only cue.
      }
      return true;
    }

    try {
      if (window.sessionStorage.getItem("storit.showMissionExp") === "true") {
        window.sessionStorage.removeItem("storit.showMissionExp");
        return true;
      }
    } catch (error) {
      // The popup state is a visual-only cue.
    }

    return false;
  }

  function missionExpModal(open = false) {
    return `
      <div class="hm-mission-exp-modal" data-exp-modal data-mission-exp-modal ${open ? "" : "hidden"}>
        <div class="hm-mission-exp-modal__dim" data-action="close-mission-exp"></div>
        <section class="hm-mission-exp-modal__sheet" role="dialog" aria-modal="true" aria-label="경험치 획득">
          <div class="hm-mission-exp-modal__scallop" aria-hidden="true">
            ${namedAsset("mission-purple-scallop.svg", "hm-mission-exp-modal__scallop-image")}
          </div>
          <button class="storit-modal-close hm-mission-exp-modal__close" type="button" data-action="close-mission-exp" aria-label="닫기">
            <img src="${assetBase}icon-exp-modal-close.svg" alt="" aria-hidden="true" />
          </button>
          <div class="hm-mission-exp-modal__confetti" aria-hidden="true"></div>
          <img class="hm-mission-exp-modal__cookie" src="${assetBase}mission-exp-cookie.svg" alt="" loading="lazy" />
          <div class="hm-mission-exp-modal__message">
            <h2>경험치를 획득하셨습니다!!!</h2>
            <p data-exp-amount>+ 30 EXP</p>
          </div>
        </section>
      </div>
    `;
  }

  function weekdayTabs() {
    return `
      <nav class="hm-weekday-tabs" aria-label="요일 필터">
        ${["전체", "월", "화", "수", "목", "금", "토", "일"]
          .map((day, index) => `<button class="${index === 1 ? "is-active" : ""}" type="button" aria-pressed="${index === 1}">${C.escape(day)}</button>`)
          .join("")}
      </nav>
    `;
  }

  function quizPreview() {
    const completedIds = readCompletedQuizIds();
    const quizItems = D.webtoons.map((item, index) => ({ ...item, quizId: `home-quiz-${index}` }));
    const orderedItems = [
      ...quizItems.filter((item) => !completedIds.includes(item.quizId)),
      ...quizItems.filter((item) => completedIds.includes(item.quizId)),
    ];

    return `
      <section class="hm-quiz-section" aria-label="오늘의 퀴즈">
        <div class="hm-quiz-list">
          ${orderedItems
            .map(
              (item) => {
                const isResult = completedIds.includes(item.quizId);
                return `
                <article class="hm-quiz-row">
                  ${C.asset("poster", item.thumb || "WEB")}
                  <div class="hm-quiz-row__copy">
                    <h3>${C.escape(item.title)}</h3>
                    <p>
                      <span class="hm-provider hm-provider--${C.escape(item.provider || "naver")}">${C.icon(item.providerIcon || "providerSeries")}</span>
                      ${item.genre.map((tag) => `<span>${C.escape(tag)}</span>`).join("")}
                    </p>
                  </div>
                  <button class="hm-quiz-row__action ${isResult ? "is-result" : ""}" type="button" ${isResult ? 'data-route="quizResultGood"' : `data-action="start-home-quiz" data-home-quiz-id="${C.escape(item.quizId)}"`}>
                    ${isResult ? "결과<br />보기" : "퀴즈<br />보기"}
                  </button>
                </article>
              `;
              },
            )
            .join("")}
        </div>
      </section>
    `;
  }

  function cheerPreview() {
    const cheers = [
      "오늘 내가 1등한대 오천냥 냠~",
      "미쳤다 오늘 왜이래 어려움",
      "행운의 쿠키 제발..",
      "행운의 쿠키 제발..",
      "행운의 쿠키 제발..",
    ];
    return `
      <section class="hm-list-section hm-cheer-preview" aria-label="오늘의 응원">
        <div class="hm-section-heading">
          <h2>오늘의 응원 한마디</h2>
          <span class="hm-cheer-cookie">${C.icon("homeCheerCookie")}</span>
        </div>
        <div class="hm-cheer-list">
          ${cheers
            .map(
              (text) => `
                <article>
                  <strong>${C.escape(text)}</strong>
                  <span>별초나</span>
                </article>
              `,
            )
            .join("")}
        </div>
      </section>
    `;
  }

  function home() {
    const showMissionExp = consumeQueuedMissionExp();
    return `
      <section class="screen home-screen hm-screen hm-home-screen nav-safe">
        ${profileBar()}
        <div class="screen-content hm-home-content">
          ${homeBanner()}
          ${quickMenu()}
          ${quizChanceBanner()}
          ${weekdayTabs()}
          ${quizPreview()}
          ${cheerPreview()}
        </div>
        ${C.bottomNav("home")}
        ${heartChargeModal()}
        ${missionExpModal(showMissionExp)}
      </section>
    `;
  }

  function missionTimer(label = "오늘의 미션 종료까지") {
    return `
      <div class="hm-timer-card" aria-label="${C.escape(label)}">
        <span>${C.escape(label)}</span>
        <strong>03:41:29 남음</strong>
      </div>
    `;
  }

  function recipeHero() {
    return `
      <section class="hm-recipe-hero">
        <img class="hm-recipe-hero__bg" src="${assetBase}mission-recipe-hero-bg.png" alt="" loading="lazy" />
        <div class="hm-recipe-hero__copy">
          <p class="hm-kicker">
            <span class="hm-recipe-sparkle" aria-hidden="true">✦</span>
            <span>오늘의 쿠키 레시피</span>
            <span class="hm-recipe-sparkle" aria-hidden="true">✦</span>
          </p>
          <h2>초코칩 쿠키 만들기</h2>
          <p>5가지 재료를 모두 모으면<br />쿠키 1개를 드려요! 🍪</p>
        </div>
        <img class="hm-recipe-hero__sparkle-art" src="${assetBase}mission-hero-sparkle.svg" alt="" loading="lazy" />
        <img class="hm-recipe-hero__chef" src="${assetBase}mission-recipe-side.png" alt="" loading="lazy" />
      </section>
    `;
  }

  function ingredientItems(allDone = false) {
    return D.ingredients.map((item) => ({ ...item, done: allDone || item.done }));
  }

  function ingredientTrack(allDone = false) {
    const items = ingredientItems(allDone);
    return `
      <section class="hm-ingredient-card" aria-label="재료 트랙">
        <div class="hm-ingredient-card__heading">
          <strong>맛있게 완성 중이에요</strong>
          <span>${items.filter((item) => item.done).length}/${items.length}</span>
        </div>
        <div class="hm-ingredient-track">
          ${items
            .map(
              (item, index) => `
                <div class="hm-ingredient ${item.done ? "is-done" : ""}">
                  <span class="hm-ingredient__node">${iconBubble(item.icon)}</span>
                  <strong>${C.escape(item.name)}</strong>
                  ${item.done ? `<small aria-label="완료">${namedAsset("icon-mission-check-green.svg", "hm-mission-check-icon")}</small>` : ""}
                </div>
              `,
            )
            .join("")}
        </div>
      </section>
    `;
  }

  function missionItem(item, allDone = false) {
    const done = allDone || item.done;
    const current = done ? 1 : 0;
    return `
      <article class="hm-mission-item ${done ? "is-done" : ""}">
        ${iconBubble(item.icon)}
        <div class="hm-mission-item__copy">
          <strong>${C.escape(item.name)}</strong>
          <p>${C.escape(item.task)}</p>
          <div class="hm-mission-progress-row">
            <div class="hm-mission-meter" aria-hidden="true"><span style="--value:${current * 100}%"></span></div>
            <span>${current} / 1</span>
          </div>
        </div>
        <button class="hm-mission-item__action" type="button" data-route="${done ? "missionDone" : "missionAllDone"}">
          ${done ? `<span>기본 재료</span><small>${namedAsset("icon-mission-check-green.svg", "hm-mission-check-icon")} 완료</small>` : "<span>바로가기</span>"}
        </button>
      </article>
    `;
  }

  function missionList(allDone = false) {
    return `
      <section class="hm-mission-list" aria-label="오늘의 미션 목록">
        ${D.ingredients.map((item) => missionItem(item, allDone)).join("")}
      </section>
    `;
  }

  function missionCompleteCard() {
    return `
      <section class="hm-mission-complete-card">
        <h2>모든 재료를 다 모았어요!</h2>
        <p>오늘의 쿠키를 구워볼까요?</p>
        <div class="hm-mission-complete-card__chef">
          <img src="${assetBase}quiz-submitted-chef.svg" alt="" loading="lazy" />
        </div>
        ${C.button("초코칩 쿠키 굽기 시작!", { route: "baking", variant: "dark" })}
      </section>
    `;
  }

  function mission(state = "progress") {
    const allDone = state === "allDone";
    const complete = state === "complete" || allDone;
    const content = `
      ${recipeHero()}
      ${missionTimer()}
      ${ingredientTrack(complete)}
      ${complete ? missionCompleteCard() : missionList(allDone)}
    `;

    return C.shell({
      title: "오늘의 미션",
      back: "home",
      content,
      className: "hm-screen hm-mission-screen",
    });
  }

  function baking() {
    return `
      <section class="screen success-scene has-scallop hm-screen hm-oven-screen hm-baking-screen">
        ${C.header("쿠키 굽는 중", { back: "missionDone" })}
        <section class="hm-oven-scene hm-oven-scene--baking" aria-label="쿠키 굽는 중">
          <div class="hm-oven-scene__copy">
            <h2>쿠키 굽는 중</h2>
          </div>
          <div class="hm-oven-scene__dots" aria-hidden="true">${namedAsset("baking-dots.svg", "hm-oven-scene__dots-image")}</div>
        </section>
      </section>
    `;
  }

  function cookieComplete() {
    return `
      <section class="screen success-scene has-scallop hm-screen hm-oven-screen hm-cookie-complete-screen">
        ${C.header("쿠키 완성", { back: "baking" })}
        <div class="screen-content">
          <section class="hm-oven-scene hm-oven-scene--complete" aria-label="쿠키 완성">
            <div class="hm-oven-scene__copy">
              <h2>쿠키 완성</h2>
            </div>
            <div class="hm-complete-cookie" aria-hidden="true">
              <img src="${assetBase}onboarding1-cookie.svg" alt="" loading="lazy" />
            </div>
            <article class="hm-complete-message">
              <strong><span class="hm-complete-message__accent">오늘의 쿠키</span>가</strong>
              <span>완성됐어요!</span>
            </article>
            <div class="hm-complete-chef"><img src="${assetBase}onboarding1-chef.svg" alt="" loading="lazy" /></div>
          </section>
        </div>
      </section>
    `;
  }

  function cookieReward() {
    return C.shell({
      title: "쿠키 획득 완료",
      back: "home",
      className: "hm-screen hm-reward-screen",
      content: `
        <section class="hm-reward-hero" aria-label="쿠키 획득 완료">
          <div class="hm-reward-hero__confetti" aria-hidden="true"></div>
          <div class="hm-reward-hero__chef">
            <img src="./assets/figma-exported/named/cookie-reward-hero.svg" alt="" />
          </div>
          <p class="hm-kicker">+ 1 쿠키 획득</p>
        </section>
        <section class="hm-reward-message">
          <h2>정말 잘했어요!</h2>
          <p>내일도 재료를 모두 모아 맛있는 쿠키를 만들어봐요</p>
        </section>
        <section class="hm-cookie-balance" aria-label="보유 쿠키">
          <h3>보유 쿠키</h3>
          <div>
            <span>${C.icon("rewardCookie")} 4</span>
            <strong class="hm-cookie-balance__arrow">${namedAsset("cookie-balance-arrow.svg", "hm-cookie-balance__arrow-image")}</strong>
            <span>${C.icon("rewardCookie")} 5</span>
          </div>
        </section>
        <div class="hm-flow-action">
          <button class="btn" type="button" data-action="open-mission-exp-home">홈으로 가기</button>
        </div>
      `,
    });
  }

  function attendanceHero() {
    return `
      <section class="hm-attendance-hero">
        <div>
          <p class="hm-kicker">2025년 9월</p>
          <h2><span>00일째</span> 연속 출석체크 중</h2>
        </div>
        <div class="hm-attendance-hero__character">
          <img src="./assets/figma-exported/named/mission-reward-cookie.svg" alt="" />
        </div>
      </section>
    `;
  }

  function attendanceCalendar(isComplete = false) {
    const days = Array.from({ length: 31 }, (_, index) => index + 1);
    const leadingBlanks = Array.from({ length: 4 });
    return `
      <section class="hm-calendar" aria-label="출석 달력">
        <div class="hm-calendar__month">
          <button class="icon-button" type="button" aria-label="이전 달">
            <img class="hm-calendar__month-arrow" src="${assetBase}icon-calendar-prev.svg" alt="" loading="lazy" />
          </button>
          <strong>2025년 5월</strong>
          <button class="icon-button" type="button" aria-label="다음 달">
            <img class="hm-calendar__month-arrow" src="${assetBase}icon-calendar-next.svg" alt="" loading="lazy" />
          </button>
        </div>
        <div class="hm-calendar__grid">
          ${["일", "월", "화", "수", "목", "금", "토"].map((day) => `<strong>${day}</strong>`).join("")}
          ${leadingBlanks.map(() => `<div class="hm-calendar__blank" aria-hidden="true"></div>`).join("")}
          ${days
            .map(
              (day) => {
                const stamped = day <= 10 || (isComplete && day === 11);
                const today = day === 11 && !isComplete;
                const future = day > 11;
                return `
                <div class="hm-calendar__day ${stamped ? "is-stamped" : ""} ${today ? "is-today" : ""} ${future ? "is-future" : ""}" data-attendance-day="${day}">
                  <span>${day}</span>
                  <em aria-hidden="true">${stamped ? `<img class="hm-calendar-stamp" src="${assetBase}attendance-cookie-stamp.svg" alt="" loading="lazy" />` : ""}</em>
                </div>
              `;
              },
            )
            .join("")}
        </div>
      </section>
    `;
  }

  function attendanceSuccessNotice(isComplete = false) {
    return `
      <aside class="hm-attendance-notice" aria-live="polite" data-attendance-notice ${isComplete ? "" : "hidden"}>
        <img class="hm-attendance-notice__icon" src="${assetBase}ingredient-butter.svg" alt="" loading="lazy" />
        <span>
          <strong>오늘의 미션 출석체크 달성!!</strong>
          <small>쿠키의 재료 &lt;버터 획득&gt;</small>
        </span>
        <button class="icon-button" type="button" data-route="mission" aria-label="미션으로 이동">›</button>
      </aside>
    `;
  }

  function attendance(extra = false) {
    return C.shell({
      title: "출석체크",
      back: "home",
      className: "hm-screen hm-attendance-screen",
      content: `
        ${missionTimer("오늘의 출석체크 종료까지")}
        <section class="hm-attendance-panel" aria-label="출석 현황">
          ${attendanceHero()}
          ${attendanceCalendar(extra)}
        </section>
        <div class="fixed-bottom-action hm-attendance-action">
          ${C.button("출석하기", { action: "complete-attendance", variant: extra ? "outline" : "", disabled: extra })}
        </div>
        ${attendanceSuccessNotice(extra)}
        ${missionExpModal()}
      `,
    });
  }

  if (typeof document !== "undefined" && document.addEventListener) {
    document.addEventListener("click", (event) => {
      const quizButton = event.target.closest?.("[data-action='start-home-quiz']");
      if (quizButton) {
        event.preventDefault();
        const quizId = quizButton.dataset.homeQuizId;
        const hearts = readHomeDemoHearts();

        if (hearts <= 0) {
          writePendingQuizId(quizId);
          const modal = quizButton.closest(".hm-home-screen")?.querySelector("[data-heart-charge-modal]");
          if (modal) modal.hidden = false;
          return;
        }

        writeHomeDemoHearts(hearts - 1);
        addCompletedQuizId(quizId);
        window.StoritRouter?.navigate("quiz");
        return;
      }

      const watchHeartAd = event.target.closest?.("[data-action='watch-heart-ad']");
      if (watchHeartAd) {
        event.preventDefault();
        const pendingQuizId = readPendingQuizId();

        watchHeartAd.closest("[data-heart-charge-modal]")?.setAttribute("hidden", "");
        if (pendingQuizId) {
          addCompletedQuizId(pendingQuizId);
          writePendingQuizId("");
          writeHomeDemoHearts(0);
          window.StoritRouter?.navigate("quiz");
        } else {
          writeHomeDemoHearts(readHomeDemoHearts() + 1);
          window.StoritRouter?.navigate("home", { push: false });
        }
        return;
      }

      const tab = event.target.closest?.(".hm-weekday-tabs button");
      if (!tab) return;

      tab.parentElement?.querySelectorAll("button").forEach((button) => {
        const selected = button === tab;
        button.classList.toggle("is-active", selected);
        button.setAttribute("aria-pressed", String(selected));
      });
    });
  }

  window.StoritScreenRegistry.register({
    home,
    mission: () => mission("progress"),
    missionAllDone: () => mission("allDone"),
    missionDone: () => mission("complete"),
    baking,
    cookieComplete,
    cookieReward,
    attendance: () => attendance(false),
    attendanceReward: () => attendance(true),
  });
})();
