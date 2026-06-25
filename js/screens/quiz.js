(function () {
  const D = window.StoritData;
  const C = window.StoritComponents;
  const quizCssHref = "./css/quiz.css?v=quiz-result-comment-20260618a";
  const namedAssetBase = "./assets/figma-exported/named/";

  const quizQuestion = {
    number: "Q4.",
    title: "공기주가 미팅에서 마음에 드는 사람으로 지목한 사람은?",
    titleLines: ["공기주가 미팅에서", "마음에 드는 사람으로", "지목한 사람은?"],
    episode: "연애리뷰 12화",
    time: "10초",
    progress: 80,
    current: 4,
    total: 5,
    answers: ["김기현", "이민호", "박서준", "최지우"],
  };

  const quizFifthQuestion = {
    number: "Q5.",
    title: "공기주가 마지막으로 선택한 데이트 장소는?",
    titleLines: ["공기주가 마지막으로", "선택한 데이트", "장소는?"],
    episode: "연애리뷰 12화",
    time: "10초",
    progress: 100,
    current: 5,
    total: 5,
    answers: ["놀이공원", "한강 공원", "영화관", "카페"],
  };

  const myQuizStats = [
    ["등록퀴즈", "7개", "심사중 2개", "myQuizRegistered"],
    ["총 플레이 수", "1,248회", "어제 대비 ▲ 18", "myQuizPlays"],
    ["평균 정답률", "38%", "상위 23%", "myQuizAccuracy"],
    ["평균 풀이 시간", "6.2초", "상위 41%", "myQuizTime"],
  ];

  const myQuizItems = [
    {
      status: "승인 완료",
      tone: "approved",
      route: "quizApproved",
      thumb: "darkMage",
      title: "66666년 만에 환생한 흑마법사 퀴즈",
      stats: {
        playCount: 255,
        correctRate: 42,
        averageTime: 5.8,
      },
      side: "플레이 1,248회",
    },
    {
      status: "심사중",
      tone: "review",
      route: "quizReview",
      thumb: "darkMage",
      title: "나 혼자만 레벨업 퀴즈",
      meta: "신청일 2024.05.20",
      side: "24시간 이내",
    },
    {
      status: "반려",
      tone: "rejected",
      route: "quizRejected",
      thumb: "darkMage",
      title: "나 혼자만 레벨업 퀴즈",
      meta: "반려일 2024.05.20",
      side: "재등록 가능",
    },
  ];

  const webtoonChoices = [
    ["aiDoctorDark", "AI. 닥터"],
    ["aiDoctorDark", "AI. 닥터"],
    ["aiDoctorDark", "AI. 닥터"],
    ["aiDoctorDark", "AI. 닥터"],
    ["aiDoctorDark", "AI. 닥터"],
  ];

  function readSelectedWebtoonIndex() {
    try {
      const stored = Number(window.sessionStorage.getItem("storit.quizCreate.webtoonIndex"));
      return Number.isFinite(stored) && stored >= 0 && stored < webtoonChoices.length ? stored : 0;
    } catch (error) {
      return 0;
    }
  }

  function writeSelectedWebtoonIndex(index) {
    try {
      window.sessionStorage.setItem("storit.quizCreate.webtoonIndex", String(index));
    } catch (error) {
      // This is demo-only visual state; selection styling can still update in the current DOM.
    }
  }

  function floatingAddIcon() {
    return `
      <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <g filter="url(#quiz-floating-add-shadow)">
          <rect x="3" y="1.5" width="40" height="40" rx="20" fill="#3D2000" shape-rendering="crispEdges"/>
          <g clip-path="url(#quiz-floating-add-clip)">
            <path d="M30.5 19H25.5V14C25.5 13.337 25.2366 12.7011 24.7678 12.2322C24.2989 11.7634 23.663 11.5 23 11.5C22.337 11.5 21.7011 11.7634 21.2322 12.2322C20.7634 12.7011 20.5 13.337 20.5 14L20.5888 19H15.5C14.837 19 14.2011 19.2634 13.7322 19.7322C13.2634 20.2011 13 20.837 13 21.5C13 22.163 13.2634 22.7989 13.7322 23.2678C14.2011 23.7366 14.837 24 15.5 24L20.5888 23.9112L20.5 29C20.5 29.663 20.7634 30.2989 21.2322 30.7678C21.7011 31.2366 22.337 31.5 23 31.5C23.663 31.5 24.2989 31.2366 24.7678 30.7678C25.2366 30.2989 25.5 29.663 25.5 29V23.9112L30.5 24C31.163 24 31.7989 23.7366 32.2678 23.2678C32.7366 22.7989 33 22.163 33 21.5C33 20.837 32.7366 20.2011 32.2678 19.7322C31.7989 19.2634 31.163 19 30.5 19Z" fill="#FEFAF4"/>
          </g>
        </g>
        <defs>
          <filter id="quiz-floating-add-shadow" x="0" y="0" width="46" height="46" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="1.5"/>
            <feGaussianBlur stdDeviation="1.5"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1473_56251"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1473_56251" result="shape"/>
          </filter>
          <clipPath id="quiz-floating-add-clip">
            <rect width="20" height="20" fill="white" transform="translate(13 11.5)"/>
          </clipPath>
        </defs>
      </svg>
    `;
  }

  const answerDrafts = [
    ["정답", "무게가 친구들을 지키기 위해 왕이 되겠다고 결심했다"],
    ["오답", "왕관이 예뻐서 갑자기 왕이 되고 싶어졌다"],
    ["오답", "빵집을 열기 위해 왕실에 지원했다"],
    ["오답", "마법 시험에서 만점을 받아서 선택됐다"],
  ];

  const statusConfig = {
    quizReview: {
      label: "심사 중",
      tone: "review",
      action: "돌아가기",
      route: "myQuiz",
    },
    quizApproved: {
      label: "승인완료",
      tone: "approved",
      action: "돌아가기",
      route: "myQuiz",
    },
    quizRejected: {
      label: "반려",
      tone: "rejected",
      action: "재등록하기",
      route: "quizCreate",
    },
  };

  function ensureQuizStyles() {
    if (
      typeof document === "undefined" ||
      !document.head ||
      !document.createElement ||
      !document.querySelector
    ) {
      return;
    }

    if (document.querySelector('link[href^="./css/quiz.css"], link[data-screen-style="quiz"]')) return;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = quizCssHref;
    link.dataset.screenStyle = "quiz";
    document.head.appendChild(link);
  }

  function namedAsset(file, className, alt = "") {
    return `<img class="${C.escape(className)}" src="${namedAssetBase}${C.escape(file)}" alt="${C.escape(alt)}" loading="lazy" />`;
  }

  function providerBadge(provider = "series") {
    const file = provider === "webtoon" ? "icon-provider-webtoon.png" : "icon-provider-series.png";
    return `<img class="quiz-provider-badge" src="${namedAssetBase}${file}" alt="" loading="lazy" />`;
  }

  function statusPill(label, tone) {
    return `<span class="quiz-status-pill is-${tone}">${C.escape(label)}</span>`;
  }

  function statCaption(caption) {
    if (!caption) return "";
    const normalized = String(caption);
    if (normalized.includes("▲")) {
      return C.escape(normalized).replace(
        "▲",
        `<img class="quiz-stat-card__triangle" src="${namedAssetBase}icon-myquiz-up-triangle.svg" alt="" loading="lazy" />`,
      );
    }
    return C.escape(normalized);
  }

  function progressBar(value) {
    return `
      <div class="quiz-progress" aria-label="진행률 ${value}%">
        <span style="width:${value}%"></span>
      </div>
    `;
  }

  function answerList(question, selected, nextRoute) {
    return `
      <div class="quiz-answer-list">
        ${question.answers
          .map((answer, index) => {
            const isSelected = selected && index === 0;
            return `
              <button class="quiz-answer ${isSelected ? "is-selected" : ""}" data-action="answer" data-route="${C.escape(nextRoute)}" aria-pressed="${isSelected}">
                <span class="quiz-answer__index">${index + 1}</span>
                <span class="quiz-answer__text">${C.escape(answer)}</span>
              </button>
            `;
          })
          .join("")}
      </div>
    `;
  }

  function playProgressStrip(question) {
    return `
      <section class="quiz-play-progress-strip" aria-label="퀴즈 진행 상황">
        ${progressBar(question.progress)}
        <span><strong>${question.current}</strong> / ${question.total}문항</span>
      </section>
    `;
  }

  function quizQuestionScreen(question, options = {}) {
    ensureQuizStyles();
    const selected = Boolean(options.selected);
    const nextRoute = options.nextRoute || "quizFifth";
    const extraClass = options.className || "";

    return C.shell({
      title: "연애리뷰",
      backModal: "quitSolvingQuiz",
      className: `quiz-screen quiz-play-screen ${extraClass}`,
      content: `
        ${playProgressStrip(question)}

        <section class="quiz-card">
          <span class="quiz-question-number">${question.number}</span>
          <h2 aria-label="${C.escape(question.title)}">${question.titleLines.map((line) => `<span>${C.escape(line)}</span>`).join("")}</h2>
          <div class="quiz-meta-row">
            <span class="quiz-meta-pill is-timer"><img src="${namedAssetBase}icon-quiz-clock.svg" alt="" loading="lazy" />${question.time}</span>
            <span class="quiz-meta-actions">
              <span class="quiz-meta-pill">${C.escape(question.episode)}</span>
              <button class="quiz-meta-link" type="button">보러가기</button>
            </span>
          </div>
          ${answerList(question, selected, nextRoute)}
          <div class="quiz-play-companion">
            ${namedAsset("quiz-play-companion.svg", "quiz-play-companion__image", "퀴즈 캐릭터")}
          </div>
        </section>
      `,
    });
  }

  function quiz(selected = false) {
    return quizQuestionScreen(quizQuestion, {
      selected,
      nextRoute: "quizFifth",
    });
  }

  function quizFifth() {
    return quizQuestionScreen(quizFifthQuestion, {
      nextRoute: "quizResultGood",
      className: "quiz-fifth-screen",
    });
  }

  function resultMetrics(good) {
    const metrics = [
      ["icon-quiz-result-correct-user.svg", "맞춘 문제", good ? "5개" : "3개"],
      ["icon-quiz-result-time.svg", "걸린 시간", "18.58초"],
      ["icon-quiz-result-score.svg", "경험치", good ? "60 EXP" : "35 EXP"],
    ];

    return `
      <div class="quiz-result-metrics">
        ${metrics
          .map(
            ([icon, label, value]) => `
              <div class="quiz-result-metric">
                <img class="quiz-result-metric__icon" src="${namedAssetBase}${C.escape(icon)}" alt="" loading="lazy" />
                <span>${C.escape(label)}</span>
                <strong>${C.escape(value)}</strong>
              </div>
            `,
          )
          .join("")}
      </div>
    `;
  }

  function quizExpModal(amount) {
    return `
      <div class="hm-mission-exp-modal" data-exp-modal data-mission-exp-modal data-exp-auto-close-ms="1000">
        <div class="hm-mission-exp-modal__dim" data-action="close-mission-exp"></div>
        <section class="hm-mission-exp-modal__sheet" role="dialog" aria-modal="true" aria-label="경험치 획득">
          <div class="hm-mission-exp-modal__scallop" aria-hidden="true">
            ${namedAsset("mission-purple-scallop.svg", "hm-mission-exp-modal__scallop-image")}
          </div>
          <button class="storit-modal-close hm-mission-exp-modal__close" type="button" data-action="close-mission-exp" aria-label="닫기">
            <img src="${namedAssetBase}icon-exp-modal-close.svg" alt="" aria-hidden="true" />
          </button>
          <div class="hm-mission-exp-modal__confetti" aria-hidden="true"></div>
          <img class="hm-mission-exp-modal__cookie" src="${namedAssetBase}mission-exp-cookie.svg" alt="" loading="lazy" />
          <div class="hm-mission-exp-modal__message">
            <h2>경험치를 획득하셨습니다!!!</h2>
            <p data-exp-amount>+ ${amount} EXP</p>
          </div>
        </section>
      </div>
    `;
  }

  function resultSupportCards(good) {
    return `
      <section class="quiz-result-card quiz-cheer-card">
        <div>
          <span class="quiz-card-label">오늘의 응원 한마디</span>
          <strong>${good ? "시험을 본 다른 사용자에게 응원의 말을 남겨주세요!" : "시험을 본 다른 학생들에게 응원의 말을 남겨주세요!"}</strong>
        </div>
        <div class="quiz-cheer-card__body">
          <label class="quiz-write-field" data-quiz-cheer-field>
            <input type="text" placeholder="${good ? "응원의 한마디를 입력해주세요..." : "오늘도 시험 보느라 수고했습니다!_무게대왕"}" aria-label="응원의 한마디" data-quiz-cheer-input />
            ${good ? `<button type="button" data-action="submit-quiz-cheer">입력</button>` : ""}
          </label>
          ${namedAsset("quiz-result-cookie-large.svg", "quiz-cheer-card__asset", "응원 캐릭터")}
        </div>
      </section>

      <section class="quiz-result-card quiz-rating-card">
        <span class="quiz-card-label">무게대왕님의 퀴즈를 평가해주세요</span>
        <p>Q. ${C.escape(quizQuestion.title)}</p>
        <div class="quiz-rating-row">
          ${[
            ["좋아요", "icon-rating-good.svg", "is-like"],
            ["쉬워요", "icon-rating-easy.svg", "is-selected"],
            ["어려워요", "icon-rating-hard.svg", ""],
          ]
            .map(
              ([label, icon, state]) => `
                <button class="${state}" type="button">
                  <img src="${namedAssetBase}${C.escape(icon)}" alt="" loading="lazy" />
                  ${C.escape(label)}
                </button>
              `,
            )
            .join("")}
        </div>
      </section>

      <section class="quiz-result-card quiz-mission-card">
        <div>
          <span class="quiz-card-label">오늘의 미션을 완료하고</span>
          <strong>더 많은 쿠키를 받아가세요!</strong>
          <button class="quiz-mission-card__button" type="button" data-route="mission">미션 확인하기</button>
        </div>
        <div class="quiz-mission-card__ingredients">
          ${["ingredient-flour.svg", "ingredient-milk.svg", "ingredient-butter.svg", "ingredient-sugar.svg", "ingredient-chocolate.svg"]
            .map((icon) => `<img src="${namedAssetBase}${C.escape(icon)}" alt="" loading="lazy" />`)
            .join("")}
        </div>
      </section>
    `;
  }

  function quizResult(good = true) {
    ensureQuizStyles();

    const score = good ? 95 : 45;

    return C.shell({
      title: "연애리뷰",
      back: "home",
      className: `quiz-screen quiz-result-screen ${good ? "is-good" : "is-low"}`,
      content: `
        <section class="quiz-result-hero">
          <div class="quiz-score-stage">
            <img class="quiz-score-ring-image" src="${namedAssetBase}${good ? "quiz-result-good-hero.svg" : "quiz-result-low-hero.svg"}" alt="${score}점" loading="lazy" />
            <div class="quiz-speech-bubble">
              <img class="quiz-speech-bubble__shape" src="${namedAssetBase}speech-onboarding-cookie.svg" alt="" loading="lazy" />
              <p>
                <strong>${good ? "정말 잘했어요!" : "아쉬워요!"}</strong>
                ${
                  good
                    ? `<span><em>맛있는 점수</em>가<br />완성됐어요!</span>`
                    : `<span>다른 웹툰도<br />풀어볼까요.</span>`
                }
              </p>
            </div>
            <div class="quiz-result-character">
              ${
                good
                  ? namedAsset("character-quiz-result-tray.svg", "quiz-result-character__image", "결과 캐릭터")
                  : namedAsset("character-quiz-low-result.png", "quiz-result-character__image", "저점 결과 캐릭터")
              }
            </div>
          </div>
        </section>

        ${resultMetrics(good)}
        ${resultSupportCards(good)}

        <div class="quiz-cta-row">
          ${C.button("랭킹 보러가기", { route: "rankingDaily", variant: "outline" })}
          ${C.button("다른 문제 풀러가기", { route: "home" })}
        </div>
        ${quizExpModal(good ? 60 : 35)}
      `,
    });
  }

  function statGrid(items) {
    return `
      <div class="quiz-stat-grid">
        ${items
          .map(
            ([label, value, caption, icon]) => `
              <div class="quiz-stat-card">
                ${icon ? C.icon(icon) : ""}
                <span>${C.escape(label)}</span>
                <strong>${C.escape(value)}</strong>
                ${caption ? `<small>${statCaption(caption)}</small>` : ""}
              </div>
            `,
          )
          .join("")}
      </div>
    `;
  }

  function myQuizRow(item) {
    return `
      <article class="quiz-list-item">
        ${C.asset("poster", item.thumb, "quiz-list-item__thumb")}
        <div class="quiz-list-item__body">
          ${statusPill(item.status, item.tone)}
          <h3>${C.escape(item.title)}</h3>
          ${
            item.stats
              ? `
                <div class="quiz-list-item__stats">
                  <span>▶ ${C.escape(item.stats.playCount)}회</span>
                  <span>정답률 ${C.escape(item.stats.correctRate)}%</span>
                  <span>평균 ${C.escape(item.stats.averageTime)}초</span>
                </div>
              `
              : `<p>${C.escape(item.meta)}</p>`
          }
        </div>
        <div class="quiz-list-item__side">
          <button type="button" data-route="${C.escape(item.route)}">상세<br />보기</button>
        </div>
      </article>
    `;
  }

  function myQuizFilterCount(filter) {
    return filter === "all"
      ? myQuizItems.length
      : myQuizItems.filter((item) => item.tone === filter).length;
  }

  function myQuizFilterButton(label, filter, active = false) {
    return `
      <button
        class="${active ? "is-active" : ""}"
        type="button"
        data-quiz-filter="${C.escape(filter)}"
        aria-pressed="${active}"
      >${C.escape(label)}${myQuizFilterCount(filter)}</button>
    `;
  }

  function filteredMyQuizRows(filter = "all") {
    const items = filter === "all"
      ? myQuizItems
      : myQuizItems.filter((item) => item.tone === filter);

    return items.map(myQuizRow).join("");
  }

  function bestQuizCard() {
    const stats = {
      playCount: 255,
      correctRate: 42,
      averageTime: 5.8,
    };

    return `
      <article class="quiz-best-card">
        ${C.asset("poster", "darkMage")}
        <div>
          <strong>66666년 만에 환생한 흑마법사 퀴즈</strong>
          <div class="quiz-best-card__stats">
            <span>▶ ${C.escape(stats.playCount)}회</span>
            <span>정답률 ${C.escape(stats.correctRate)}%</span>
            <span>평균 ${C.escape(stats.averageTime)}초</span>
          </div>
        </div>
      </article>
    `;
  }

  function myQuiz() {
    ensureQuizStyles();

    return C.shell({
      title: "내 웹툰 퀴즈",
      back: "myPage",
      className: "quiz-screen my-quiz-screen",
      content: `
        <section class="my-quiz-hero" data-route="quizCreate">
          <div>
            <h2>나만의 웹툰 퀴즈를 만들어봐요!</h2>
            <p>유저 참여 현황과 심사 결과를 확인할 수 있어요.</p>
            <button type="button">퀴즈 만들러 가기 <img class="my-quiz-chevron-right" src="${namedAssetBase}myquiz-chevron-right.svg" alt="" loading="lazy" /></button>
          </div>
          <img class="my-quiz-hero__sparkle" src="${namedAssetBase}myquiz-hero-sparkle.svg" alt="" loading="lazy" />
          ${namedAsset("character-myquiz-hero-cookie.svg", "my-quiz-hero__chef")}
        </section>

        <section class="quiz-section">
          <div class="quiz-section__head">
            <h2>유저 참여 현황</h2>
          </div>
          ${statGrid(myQuizStats)}
        </section>

        <section class="quiz-section">
          <div class="quiz-section__head">
            <h2>가장 많이 풀린 퀴즈</h2>
          </div>
          ${bestQuizCard()}
        </section>

        <section class="quiz-section quiz-list-section">
          <div class="quiz-section__head">
            <h2>내 퀴즈 목록</h2>
            <div class="quiz-filter-row">
              ${myQuizFilterButton("전체", "all", true)}
              ${myQuizFilterButton("승인", "approved")}
              ${myQuizFilterButton("심사중", "review")}
              ${myQuizFilterButton("반려", "rejected")}
            </div>
          </div>
          <div class="quiz-list" data-my-quiz-list>
            ${filteredMyQuizRows()}
          </div>
        </section>
        <button class="quiz-floating-add" type="button" data-route="quizCreate" aria-label="퀴즈 만들기">${floatingAddIcon()}</button>
      `,
    });
  }

  function webtoonSelector(selected = false) {
    const selectedIndex = selected ? readSelectedWebtoonIndex() : -1;
    const actionIcon = "icon-quiz-create-add.svg";
    return `
      <div class="quiz-webtoon-picker">
        <div class="quiz-webtoon-strip">
          ${webtoonChoices
            .map(
              ([thumb, title], index) => `
                <button class="quiz-webtoon-choice ${selectedIndex === index ? "is-selected" : ""} ${selected && selectedIndex !== index ? "is-faded" : ""}" type="button" data-route="quizCreateSelected" data-quiz-webtoon-index="${index}" aria-pressed="${selectedIndex === index}">
                  ${C.asset("poster", thumb)}
                  <span>${C.escape(title)}</span>
                </button>
              `,
            )
            .join("")}
        </div>
        <button class="quiz-webtoon-add ${selected ? "is-next" : ""}" type="button" data-route="${selected ? "quizCreateSearchSelected" : "quizCreateSearch"}" aria-label="웹툰 검색">
          <img src="${namedAssetBase}${actionIcon}" alt="" loading="lazy" />
        </button>
      </div>
    `;
  }

  function episodeSelector() {
    return `
      <label class="quiz-episode-field">
        <input value="" placeholder="예: 5" inputmode="numeric" />
      </label>
    `;
  }

  function answerFields(blank = false) {
    const rows = blank
      ? [
          ["정답", "정답 작성하기"],
          ["오답", "오답 작성하기"],
          ["오답", "오답 작성하기"],
          ["오답", "오답 작성하기"],
        ]
      : answerDrafts;

    return `
      <div class="quiz-answer-fields">
        ${rows
          .map(
            ([type, value], index) => `
              <label class="quiz-answer-field ${index === 0 ? "is-correct" : ""}">
                <span class="quiz-answer-marker" aria-hidden="true">
                  <img src="${namedAssetBase}${index === 0 ? "icon-quiz-answer-o.svg" : "icon-quiz-answer-x.svg"}" alt="" loading="lazy" />
                </span>
                <input value="${blank ? "" : C.escape(value)}" placeholder="${blank ? C.escape(value) : ""}" />
              </label>
            `,
          )
          .join("")}
      </div>
    `;
  }

  function quizSearchSheet(active = false) {
    return `
      <div class="quiz-search-overlay" aria-hidden="true" data-route="quizCreate"></div>
      <section class="quiz-search-sheet" role="dialog" aria-modal="true" aria-label="웹툰 검색">
        <span class="quiz-search-sheet__handle"></span>
        <h2>웹툰을 검색해보세요</h2>
        <label class="quiz-search-field">
          <input value="연애리뷰" aria-label="웹툰 검색어" />
          <button type="button" aria-label="검색">
            <img class="quiz-search-icon" src="${namedAssetBase}icon-quiz-create-magnifier.svg" alt="" loading="lazy" />
          </button>
        </label>
        <button class="quiz-search-result ${active ? "is-selected" : ""}" type="button" aria-pressed="${active}">
          ${C.asset("poster", "retireLife", "quiz-search-result__thumb")}
          <span>
            <strong>연애리뷰</strong>
            <em>${providerBadge("series")} <i>사이다</i> <i>사이다</i></em>
          </span>
        </button>
        <div class="quiz-search-actions">
          <button type="button" class="quiz-search-actions__cancel" data-route="quizCreate">취소</button>
          <button type="button" class="quiz-search-actions__select" ${active ? 'data-route="quizCreateSelected"' : "disabled"}>선택하기</button>
        </div>
      </section>
    `;
  }

  function quizCreate(options = {}) {
    ensureQuizStyles();
    const selected = Boolean(options.selected);
    const searchState = options.search || "";

    return C.shell({
      title: "퀴즈 만들기",
      backModal: "quitQuiz",
      className: `quiz-screen quiz-create-screen ${searchState ? "is-search-open" : ""}`,
      content: `
        <section class="quiz-form-step">
          <div class="quiz-form-step__head">
            <span>1</span>
            <strong>웹툰을 선택해주세요</strong>
          </div>
          ${webtoonSelector(selected)}
        </section>

        <section class="quiz-form-step">
          <div class="quiz-form-step__head">
            <span>2</span>
            <strong>회차를 작성해주세요</strong>
          </div>
          ${episodeSelector()}
        </section>

        <section class="quiz-form-step">
          <div class="quiz-form-step__head">
            <span>3</span>
            <strong>문제를 만들어주세요</strong>
          </div>
          <label class="quiz-question-field">
            <span>퀴즈 질문</span>
            <textarea placeholder="예: 무게가 왕이 되겠다고 결심하게 된 이유는?"></textarea>
          </label>
          <span class="quiz-input-caption">퀴즈 정답 & 오답</span>
          ${answerFields(true)}
        </section>

        <section class="quiz-review-note">
          <img class="asset icon quiz-create-bottom-cookie" src="${namedAssetBase}character-quiz-create-bottom-cookie.svg" alt="" loading="lazy" />
          <p>부적절한 내용은 검수 후 등록이 거부될 수 있습니다!<br />등록된 퀴즈는 24시간 내 심사 후 공개돼요!<br />등록하신 웹툰 퀴즈에 대한 저작권은 프레시밀크에 귀속 됩니다.</p>
        </section>

        <button class="quiz-register-button" type="button" disabled>문제 등록하기</button>
        ${searchState ? quizSearchSheet(searchState === "active") : ""}
      `,
    });
  }

  function quizSubmitted() {
    ensureQuizStyles();

    return `
      <section class="screen quiz-screen quiz-submit-screen quiz-submit-scene">
        ${C.header("퀴즈 만들기", { back: "myQuiz" })}
        <div class="quiz-submit-scene__body">
          <img class="quiz-submit-scene__bg" src="./assets/figma-exported/named/quiz-submitted-bg.svg" alt="" />
          <div class="quiz-submit-scene__speech">
            <img src="./assets/figma-exported/named/quiz-submitted-speech.svg" alt="" />
            <p>등록이 <mark>완료</mark><br />되었습니다</p>
          </div>
          <img class="quiz-submit-scene__chef" src="./assets/figma-exported/named/quiz-submitted-chef.svg" alt="" />
          <button class="btn quiz-submit-scene__button dark" type="button" data-route="home">홈 화면으로 돌아가기</button>
        </div>
      </section>
    `;
  }

  function statusStats() {
    return `
      <section class="quiz-status-panel">
        <div class="quiz-section__head">
          <h2>유저 참여 현황</h2>
        </div>
        ${statGrid([
          ["총 플레이 수", "1,248회", "어제 대비 ▲ 18", "myQuizPlays"],
          ["평균 정답률", "38%", "상위 23%", "myQuizAccuracy"],
          ["평균 풀이 시간", "6.2초", "상위 41%", "myQuizTime"],
        ])}
      </section>
    `;
  }

  function statusRatings() {
    return `
      <section class="quiz-status-panel quiz-status-ratings">
        <h2>내 퀴즈 평가</h2>
        <div>
          ${[
            ["좋아요", "7 개", "good"],
            ["쉬워요", "15 개", "easy"],
            ["어려워요", "23 개", "hard"],
          ]
            .map(
              ([label, value, face]) => `
                <article>
                  <span class="quiz-rating-pill is-${C.escape(face)}">${C.icon(`rating${face[0].toUpperCase()}${face.slice(1)}`)}<strong>${C.escape(label)}</strong></span>
                  <em>${C.escape(value)}</em>
                </article>
              `,
            )
            .join("")}
        </div>
      </section>
    `;
  }

  function statusQuestionPreview(status) {
    return `
      <section class="quiz-status-panel">
        <div class="quiz-section__head">
          <h2>퀴즈 질문</h2>
        </div>
        <div class="quiz-question-preview">
          <strong>예: 무게가 왕이 되겠다고 결심하게 된 이유는?</strong>
          <h3>퀴즈 정답 & 오답</h3>
          ${answerDrafts
            .map(
              ([type, value], index) => `
                <div class="${index === 0 ? "is-correct" : ""}">
                  <span class="quiz-answer-marker" aria-hidden="true">
                    <img src="${namedAssetBase}${index === 0 ? "icon-quiz-answer-o.svg" : "icon-quiz-answer-x.svg"}" alt="" loading="lazy" />
                  </span>
                  <p>${C.escape(`${type} 작성하기`)}</p>
                </div>
              `,
            )
            .join("")}
        </div>
      </section>
    `;
  }

  function statusSummary(info) {
    return `
      <article class="quiz-status-summary">
        ${C.asset("poster", "aiDoctorDark", "quiz-status-summary__thumb")}
        <div>
          <h3>AI. 닥터 8화</h3>
          <p>등록일 2026.05.24</p>
          ${statusPill(info.label, info.tone)}
        </div>
      </article>
    `;
  }

  function quizStatus(status) {
    ensureQuizStyles();

    const info = statusConfig[status];
    return C.shell({
      title: "내 웹툰 퀴즈",
      back: "myQuiz",
      className: `quiz-screen quiz-status-screen is-${info.tone}`,
      content: `
        ${statusSummary(info)}

        ${status === "quizApproved" ? statusStats() : ""}
        ${status === "quizApproved" ? statusRatings() : ""}
        ${statusQuestionPreview(info)}

        ${
          status === "quizRejected"
            ? `
              <section class="quiz-reject-reason">
                <strong>${C.icon("rejectReason")}반려 사유</strong>
                <p>정답이 맞지 않음</p>
              </section>
            `
            : ""
        }

        <div class="quiz-primary-action fixed-bottom-action">
          ${C.button(info.action, { route: info.route })}
        </div>
      `,
    });
  }

  function markSelected(target, itemSelector) {
    const group = target.parentElement;
    if (!group) return;

    group.querySelectorAll(itemSelector).forEach((item) => {
      const selected = item === target;
      item.classList.toggle("is-selected", selected);
      if (item.hasAttribute("aria-pressed")) item.setAttribute("aria-pressed", String(selected));
    });
  }

  function updateQuizCreateSubmit(screen) {
    if (!screen) return;

    const submitButton = screen.querySelector(".quiz-register-button");
    if (!submitButton) return;

    const hasWebtoon = Boolean(screen.querySelector(".quiz-webtoon-choice.is-selected"));
    const hasEpisode = Boolean(screen.querySelector(".quiz-episode-field input")?.value.trim());
    const hasQuestion = Boolean(screen.querySelector(".quiz-question-field textarea")?.value.trim());
    const answerInputs = Array.from(screen.querySelectorAll(".quiz-answer-field input"));
    const hasAnswers = answerInputs.length > 0 && answerInputs.every((input) => input.value.trim());
    const isReady = hasWebtoon && hasEpisode && hasQuestion && hasAnswers;

    submitButton.disabled = !isReady;
    submitButton.classList.toggle("is-ready", isReady);

    if (isReady) {
      submitButton.dataset.route = "quizSubmitted";
    } else {
      delete submitButton.dataset.route;
    }
  }

  if (typeof document !== "undefined" && document.addEventListener) {
    document.addEventListener("click", (event) => {
      const answer = event.target.closest?.(".quiz-answer");
      if (answer) markSelected(answer, ".quiz-answer");

      const webtoon = event.target.closest?.(".quiz-webtoon-choice");
      if (webtoon) {
        const selectedIndex = Number(webtoon.dataset.quizWebtoonIndex || 0);
        if (Number.isFinite(selectedIndex)) writeSelectedWebtoonIndex(selectedIndex);
        markSelected(webtoon, ".quiz-webtoon-choice");
        webtoon.parentElement?.querySelectorAll(".quiz-webtoon-choice").forEach((item) => {
          item.classList.toggle("is-faded", item !== webtoon);
        });
        updateQuizCreateSubmit(webtoon.closest(".quiz-create-screen"));
      }

      const episode = event.target.closest?.(".quiz-episode-grid button");
      if (episode) markSelected(episode, "button");

      const rating = event.target.closest?.(".quiz-rating-row button");
      if (rating) markSelected(rating, "button");

      const cheerButton = event.target.closest?.("[data-action='submit-quiz-cheer']");
      if (cheerButton) {
        const field = cheerButton.closest("[data-quiz-cheer-field]");
        const input = field?.querySelector("[data-quiz-cheer-input]");
        const value = input?.value.trim();

        if (!field || !value) return;

        field.classList.add("is-submitted");
        field.innerHTML = `<span>${C.escape(value)}_${C.escape(D.user.name)}</span>`;
        return;
      }

      const searchResult = event.target.closest?.(".quiz-search-result");
      if (searchResult) {
        const isSelected = searchResult.classList.toggle("is-selected");
        searchResult.setAttribute("aria-pressed", String(isSelected));

        const selectButton = searchResult.closest(".quiz-search-sheet")?.querySelector(".quiz-search-actions__select");
        if (selectButton) {
          selectButton.disabled = !isSelected;
          if (isSelected) {
            selectButton.dataset.route = "quizCreateSelected";
          } else {
            delete selectButton.dataset.route;
          }
        }
      }

      const quizFilter = event.target.closest?.("[data-quiz-filter]");
      if (quizFilter) {
        const filterRow = quizFilter.closest(".quiz-filter-row");
        const quizList = quizFilter.closest(".quiz-list-section")?.querySelector("[data-my-quiz-list]");
        const filter = quizFilter.dataset.quizFilter || "all";

        filterRow?.querySelectorAll("[data-quiz-filter]").forEach((button) => {
          const selected = button === quizFilter;
          button.classList.toggle("is-active", selected);
          button.setAttribute("aria-pressed", String(selected));
        });

        if (quizList) quizList.innerHTML = filteredMyQuizRows(filter);
      }
    });

    document.addEventListener("input", (event) => {
      const screen = event.target.closest?.(".quiz-create-screen");
      if (screen) updateQuizCreateSubmit(screen);
    });

    document.addEventListener("change", (event) => {
      const screen = event.target.closest?.(".quiz-create-screen");
      if (screen) updateQuizCreateSubmit(screen);
    });
  }

  window.StoritScreenRegistry.register({
    quiz: () => quiz(false),
    quizSelected: () => quiz(true),
    quizFifth,
    quizResultGood: () => quizResult(true),
    quizResultLow: () => quizResult(false),
    myQuiz,
    quizCreate: () => quizCreate(),
    quizCreateSelected: () => quizCreate({ selected: true }),
    quizCreateSearch: () => quizCreate({ search: "inactive" }),
    quizCreateSearchSelected: () => quizCreate({ search: "active" }),
    quizSubmitted,
    quizReview: () => quizStatus("quizReview"),
    quizApproved: () => quizStatus("quizApproved"),
    quizRejected: () => quizStatus("quizRejected"),
    myQuizReviewing: () => quizStatus("quizReview"),
    myQuizApproved: () => quizStatus("quizApproved"),
    myQuizRejected: () => quizStatus("quizRejected"),
  });
})();
