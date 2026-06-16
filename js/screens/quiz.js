(function () {
  const D = window.StoritData;
  const C = window.StoritComponents;
  const quizCssHref = "./css/quiz.css?v=quiz-flow-20260616b";
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
      meta: "정답률 42% · 평균 5.8초",
      side: "플레이 1,248회",
    },
    {
      status: "심사중",
      tone: "review",
      route: "quizReview",
      thumb: "darkMage",
      title: "나 혼자만 레벨업 퀴즈",
      meta: "신청일 2026.05.24",
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
    ["aiDoctor", "AI. 닥터"],
    ["aiDoctor", "AI. 닥터"],
    ["aiDoctor", "AI. 닥터"],
    ["aiDoctor", "AI. 닥터"],
    ["aiDoctor", "AI. 닥터"],
  ];

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

    if (document.querySelector(`link[href="${quizCssHref}"]`)) return;

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

  function progressBar(value) {
    return `
      <div class="quiz-progress" aria-label="진행률 ${value}%">
        <span style="width:${value}%"></span>
      </div>
    `;
  }

  function answerList(selected) {
    return `
      <div class="quiz-answer-list">
        ${quizQuestion.answers
          .map((answer, index) => {
            const isSelected = selected && index === 0;
            return `
              <button class="quiz-answer ${isSelected ? "is-selected" : ""}" data-action="answer" aria-pressed="${isSelected}">
                <span class="quiz-answer__index">${index + 1}</span>
                <span class="quiz-answer__text">${C.escape(answer)}</span>
              </button>
            `;
          })
          .join("")}
      </div>
    `;
  }

  function playProgressStrip() {
    return `
      <section class="quiz-play-progress-strip" aria-label="퀴즈 진행 상황">
        ${progressBar(quizQuestion.progress)}
        <span><strong>${quizQuestion.current}</strong> / ${quizQuestion.total}문항</span>
      </section>
    `;
  }

  function quiz(selected = false) {
    ensureQuizStyles();

    return C.shell({
      title: "연애리뷰",
      back: "home",
      className: "quiz-screen quiz-play-screen",
      content: `
        ${playProgressStrip()}

        <section class="quiz-card">
          <span class="quiz-question-number">${quizQuestion.number}</span>
          <h2 aria-label="${C.escape(quizQuestion.title)}">${quizQuestion.titleLines.map((line) => `<span>${C.escape(line)}</span>`).join("")}</h2>
          <div class="quiz-meta-row">
            <span class="quiz-meta-pill is-timer"><img src="${namedAssetBase}icon-quiz-clock.svg" alt="" loading="lazy" />${quizQuestion.time}</span>
            <span class="quiz-meta-pill">${C.escape(quizQuestion.episode)}</span>
            <button class="quiz-meta-link" type="button">보러가기</button>
          </div>
          ${answerList(selected)}
          <div class="quiz-play-companion">
            ${namedAsset("quiz-play-companion.svg", "quiz-play-companion__image", "퀴즈 캐릭터")}
          </div>
        </section>
      `,
    });
  }

  function resultMetrics(good) {
    const metrics = [
      ["resultCorrect", "맞춘 문제", good ? "5개" : "3개", "전체 5문항"],
      ["resultTime", "걸린 시간", "18.58초", "빠른 풀이"],
      ["resultScore", "경험치", good ? "60 EXP" : "95점", "획득 완료"],
    ];

    return `
      <div class="quiz-result-metrics">
        ${metrics
          .map(
            ([icon, label, value, caption]) => `
              <div class="quiz-result-metric">
                ${C.asset("icon", icon)}
                <span>${C.escape(label)}</span>
                <strong>${C.escape(value)}</strong>
                <small>${C.escape(caption)}</small>
              </div>
            `,
          )
          .join("")}
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
          <button class="quiz-write-prompt" type="button">${good ? "응원의 한마디를 입력해주세요..." : "오늘도 시험 보느라 수고했습니다!_무게대왕"}</button>
          ${namedAsset("quiz-result-cookie-large.svg", "quiz-cheer-card__asset", "응원 캐릭터")}
        </div>
      </section>

      <section class="quiz-result-card">
        <span class="quiz-card-label">무게대왕님의 퀴즈를 평가해주세요</span>
        <p>Q. ${C.escape(quizQuestion.title)}</p>
        <div class="quiz-rating-row">
          ${[
            ["좋아요", "is-like"],
            ["쉬워요", "is-selected"],
            ["어려워요", ""],
          ]
            .map(([label, state]) => `<button class="${state}" type="button"><span></span>${C.escape(label)}</button>`)
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
          ${["flour", "milk", "butter", "sugar", "chocolate"].map((icon) => C.icon(icon)).join("")}
        </div>
      </section>
    `;
  }

  function quizResult(good = true) {
    ensureQuizStyles();

    const score = good ? 95 : 45;

    return C.shell({
      title: "연애리뷰",
      back: "quiz",
      className: `quiz-screen quiz-result-screen ${good ? "is-good" : "is-low"}`,
      content: `
        <section class="quiz-result-hero">
          <div class="quiz-score-stage">
            <img class="quiz-score-ring-image" src="${namedAssetBase}${good ? "quiz-result-good-hero.svg" : "quiz-result-low-hero.svg"}" alt="${score}점" loading="lazy" />
            <div class="quiz-speech-bubble">
              <strong>${good ? "정말 잘했어요!" : "아쉬워요!"}</strong>
              <span>${good ? "맛있는 점수가 완성됐어요!" : "다른 웹툰도 풀어볼까요."}</span>
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
          ${C.button("다른 문제 풀러가기", { route: "quiz" })}
        </div>
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
                ${caption ? `<small>${C.escape(caption)}</small>` : ""}
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
          <p>${C.escape(item.meta)}</p>
        </div>
        <div class="quiz-list-item__side">
          <button type="button" data-route="${C.escape(item.route)}">상세<br />보기</button>
        </div>
      </article>
    `;
  }

  function bestQuizCard() {
    return `
      <article class="quiz-best-card">
        ${C.asset("poster", "darkMage")}
        <div>
          <strong>66666년 만에 환생한 흑마법사 퀴즈</strong>
          <p>▶ 255회&nbsp;&nbsp;&nbsp;정답률 42%&nbsp;&nbsp;&nbsp;평균 5.8초</p>
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
            <button type="button">퀴즈 만들러 가기 ></button>
          </div>
          ${namedAsset("character-recipe-chef.png", "my-quiz-hero__chef")}
        </section>

        <section class="quiz-section">
          <div class="quiz-section__head">
            <h2>유저 참여 현황</h2>
            <span>최근 30일</span>
          </div>
          ${statGrid(myQuizStats)}
        </section>

        <section class="quiz-section">
          <div class="quiz-section__head">
            <h2>가장 많이 풀린 퀴즈</h2>
          </div>
          ${bestQuizCard()}
        </section>

        <section class="quiz-section">
          <div class="quiz-section__head">
            <h2>내 퀴즈 목록</h2>
            <div class="quiz-filter-row">
              <button class="is-active" type="button">전체 7</button>
              <button type="button">승인4</button>
              <button type="button">심사중2</button>
              <button type="button">반려1</button>
            </div>
          </div>
          <div class="quiz-list">
            ${myQuizItems.map(myQuizRow).join("")}
          </div>
        </section>
        <button class="quiz-floating-add" type="button" data-route="quizCreate" aria-label="퀴즈 만들기">+</button>
      `,
    });
  }

  function webtoonSelector() {
    const selected = arguments[0] === true;
    return `
      <div class="quiz-webtoon-strip">
        ${webtoonChoices
          .map(
            ([thumb, title], index) => `
              <button class="quiz-webtoon-choice ${selected && index === 0 ? "is-selected" : ""} ${selected && index > 0 ? "is-faded" : ""}" type="button">
                ${C.asset("poster", thumb)}
                <span>${C.escape(title)}</span>
              </button>
            `,
          )
          .join("")}
        <button class="quiz-webtoon-add" type="button" data-route="${selected ? "quizCreateSearchSelected" : "quizCreateSearch"}" aria-label="웹툰 검색">+</button>
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
                <span class="quiz-answer-marker">${index === 0 ? "○" : "×"}</span>
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
      <div class="quiz-search-overlay" aria-hidden="true"></div>
      <section class="quiz-search-sheet" role="dialog" aria-modal="true" aria-label="웹툰 검색">
        <span class="quiz-search-sheet__handle"></span>
        <h2>웹툰을 검색해보세요</h2>
        <label class="quiz-search-field">
          <input value="연애리뷰" aria-label="웹툰 검색어" />
          <button type="button" aria-label="검색">⌕</button>
        </label>
        <button class="quiz-search-result ${active ? "is-selected" : ""}" type="button" data-route="quizCreateSearchSelected">
          ${C.asset("poster", "romance", "quiz-search-result__thumb")}
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
          ${C.asset("icon", "quizWriting")}
          <p>부적절한 내용은 검수 후 등록이 거부될 수 있습니다!<br />등록된 퀴즈는 24시간 내 심사 후 공개돼요!<br />등록하신 웹툰 퀴즈에 대한 저작권은 프레시밀크에 귀속 됩니다.</p>
        </section>

        <button class="quiz-register-button ${selected ? "is-ready" : ""}" type="button" ${selected ? 'data-route="quizSubmitted"' : "disabled"}>문제 등록하기</button>
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
            ["좋아요", "7개", "good"],
            ["쉬워요", "15개", "easy"],
            ["어려워요", "23개", "hard"],
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
                  <span>${index === 0 ? "○" : "×"}</span>
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
        ${C.asset("poster", "aiDoctor", "quiz-status-summary__thumb")}
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
                <strong>반려 사유</strong>
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

  if (typeof document !== "undefined" && document.addEventListener) {
    document.addEventListener("click", (event) => {
      const answer = event.target.closest?.(".quiz-answer");
      if (answer) markSelected(answer, ".quiz-answer");

      const webtoon = event.target.closest?.(".quiz-webtoon-choice");
      if (webtoon) markSelected(webtoon, ".quiz-webtoon-choice");

      const episode = event.target.closest?.(".quiz-episode-grid button");
      if (episode) markSelected(episode, "button");

      const rating = event.target.closest?.(".quiz-rating-row button");
      if (rating) markSelected(rating, "button");
    });
  }

  window.StoritScreenRegistry.register({
    quiz: () => quiz(false),
    quizSelected: () => quiz(true),
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
  });
})();
