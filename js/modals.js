(function () {
  const C = window.StoritComponents;
  const assetBase = "./assets/figma-exported/named/";
  let copyToastTimer = 0;

  const inviteFallback = {
    code: "B4630509",
    title: "친구에게 링크를 보내주세요",
    description: "초대한 친구가 신규 가입자일 경우에만 혜택을 받을 수 있어요!",
    primaryAction: "카카오톡으로 초대하기",
    rewardLink: "친구 초대 별도 보상 보기",
    copyToast: "복사 되었습니다!",
    rewards: [
      { condition: "친구 가입 완료", reward: "쿠키 2개" },
      { condition: "친구 퀴즈 3회 참여", reward: "쿠키 1개" },
      { condition: "친구가 3일 출석", reward: "쿠키 2개" },
    ],
  };

  function inviteData() {
    return window.StoritData?.invite || inviteFallback;
  }

  const modalTemplates = {
    logout: {
      icon: "logoutFigma",
      title: "정말 로그아웃 하시겠습니까?",
      text: "쿠키 관련해서 중요한 정보를 알림으로 \n받지 못해요 ㅜ.ㅜ",
      buttons: [
        ["머무르기", "orange", "close"],
        ["로그아웃", "soft", "signup"],
      ],
    },
    editLife: {
      icon: "quizWriting",
      title: "이대로 수정하시겠습니까?",
      text: "기자매",
      buttons: [
        ["취소", "orange", "close"],
        ["수정하기", "soft", "close"],
      ],
    },
    editGenre: {
      icon: "quizWriting",
      title: "이대로 수정하시겠습니까?",
      text: "공포, 스릴러",
      buttons: [
        ["취소", "orange", "close"],
        ["수정하기", "soft", "close"],
      ],
    },
    quitQuiz: {
      icon: "question",
      title: "작성중인 내용이 있습니다.\n정말 나가시겠습니까?",
      text: "등록하지 않고 페이지를 벗어날 경우,\n지금까지 작성한 내용이 사라집니다.",
      buttons: [
        ["머무르기", "orange", "close"],
        ["이동하기", "soft", "myQuiz"],
      ],
    },
    cookieShortage: {
      icon: "cookie",
      title: "보유 쿠키 부족",
      text: "현재 보유한 쿠키 수량이 부족해요. 즐겁게 웹툰 퀴즈를 풀고, 더 많은 쿠키를 모아보세요!",
      buttons: [["확인", "orange", "close"]],
    },
    issueFailed: {
      icon: "cookie",
      title: "쿠폰 발급 실패",
      text: "쿠폰 발급에 실패했어요. 사용한 쿠키는 자동 복구되었어요. 나중에 다시 시도해주세요.",
      buttons: [["확인", "orange", "close"]],
    },
    adHeart: {
      icon: "cookieWings",
      title: "하트가 모두 소진되었어요!",
      text: "광고를 시청하면 하트 1개를 즉시 충전할 수 있어요. 오늘 남은 광고 충전 횟수 7 / 10",
      buttons: [
        ["취소", "soft", "close"],
        ["광고 보기", "orange", "close"],
      ],
    },
  };

  const accountProfileCookies = [
    "profile-cookie-07.svg",
    "profile-cookie-03.svg",
    "profile-cookie-04.svg",
    "profile-cookie-01.svg",
    "profile-cookie-02.svg",
    "profile-cookie-05.svg",
    "profile-cookie-08.svg",
    "profile-cookie-10.svg",
    "profile-cookie-06.svg",
    "profile-cookie-09.svg",
  ];
  const accountGenres = [
    "판타지",
    "로맨스",
    "로맨스 판타지",
    "음악",
    "무협",
    "드라마",
    "학원물",
    "스릴러",
    "시대극",
    "액션",
    "모험",
    "공포",
    "일상물",
    "스포츠",
    "개그",
    "미스터리",
    "추리",
    "SF",
    "코미디"
  ];

  const accountLifeEditIcon = `
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="60" height="60" rx="30" fill="#FEF4D2"/>
      <path d="M46.0732 46.0714L42.5018 35.3571L22.859 15.7143C21.0732 13.9286 17.5018 13.9286 15.7161 15.7143C13.9304 17.5 13.9304 21.0714 15.7161 22.8571L35.359 42.5L46.0732 46.0714Z" stroke="#EF9F27" stroke-width="3.57143" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M24.6445 17.5L17.5017 24.6429" stroke="#EF9F27" stroke-width="3.57143" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M40.7148 35.3572L35.3577 40.7143" stroke="#EF9F27" stroke-width="1.78571" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M21.07 15.7144H15.7129V21.0715L35.3557 40.7144L40.7129 35.3572L21.07 15.7144Z" fill="#F9C356"/>
    </svg>
  `;

  function renderAccountSheet(className, label, content) {
    return `
      <div class="modal-layer account-sheet-layer" role="presentation">
        <button class="account-sheet-backdrop" type="button" data-close-modal aria-label="닫기"></button>
        <section class="account-sheet ${className}" role="dialog" aria-modal="true" aria-label="${C.escape(label)}">
          <span class="account-sheet__handle" aria-hidden="true"></span>
          ${content}
        </section>
      </div>
    `;
  }

  function renderAccountProfileSheet() {
    const currentName = document.querySelector(".account-final-profile__name h2")?.textContent?.trim() || "감자도리";
    const currentCookie = document.querySelector(".account-final-profile__avatar img")?.getAttribute("src")?.split("/").pop() || "user-profile-cookie.svg";
    const normalizedCookie = accountProfileCookies.includes(currentCookie) ? currentCookie : "profile-cookie-01.svg";
    return renderAccountSheet(
      "account-profile-edit-sheet",
      "프로필 수정",
      `
        <h2>프로필 수정</h2>
        <div class="account-profile-edit-preview" aria-label="프로필 미리보기">
          <img src="${assetBase}${C.escape(normalizedCookie)}" alt="" loading="lazy" />
        </div>
        <div class="account-profile-edit-feedback" data-account-profile-feedback></div>
        <input class="account-profile-edit-input" type="text" value="${C.escape(currentName)}" maxlength="10" aria-label="닉네임" data-account-profile-name />
        <div class="account-profile-edit-grid">
          ${accountProfileCookies
            .map(
              (file, index) => `
                <button class="account-profile-cookie-option ${file === normalizedCookie ? "is-selected" : ""}" type="button" data-action="select-account-profile-cookie" data-profile-cookie="${C.escape(file)}" aria-label="프로필 쿠키 ${index + 1}">
                  <img src="${assetBase}${C.escape(file)}" alt="" loading="lazy" />
                  <span aria-hidden="true"></span>
                </button>
              `,
            )
            .join("")}
        </div>
        <button class="account-sheet-album" type="button">앨범에서 사진 선택</button>
        <div class="account-sheet-actions">
          <button class="account-sheet-cancel" type="button" data-close-modal>취소</button>
          <button class="account-sheet-submit" type="button" data-action="confirm-account-profile">수정하기</button>
        </div>
      `,
    );
  }

  function renderAccountGenreSheet() {
    const current = (document.querySelector(".account-final-pref-grid section:nth-child(2) strong")?.textContent || "공포, 스릴러")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);
    return renderAccountSheet(
      "account-genre-edit-sheet",
      "선호 웹툰 장르",
      `
        <div class="account-genre-edit-icon"><img src="${assetBase}icon-mypage-genre-heart.svg" alt="" loading="lazy" /></div>
        <h2>선호 웹툰 장르 <small>(최대 3개)</small></h2>
        <div class="account-genre-chip-grid">
          ${accountGenres
            .map(
              (genre) => `
                <button class="account-genre-chip ${current.includes(genre) ? "is-selected" : ""}" type="button" data-action="select-account-genre" data-genre="${C.escape(genre)}">
                  ${C.escape(genre)}
                </button>
              `,
            )
            .join("")}
        </div>
        <div class="account-sheet-actions">
          <button class="account-sheet-cancel" type="button" data-close-modal>취소</button>
          <button class="account-sheet-submit" type="button" data-action="confirm-account-genre">수정하기</button>
        </div>
      `,
    );
  }

  function renderAccountLifeSheet() {
    const current = document.querySelector(".account-final-pref-grid section:first-child strong")?.textContent?.trim() || "기자매";
    return renderAccountSheet(
      "account-life-edit-sheet",
      "나의 인생 웹툰",
      `
        <div class="account-life-edit-icon">${accountLifeEditIcon}</div>
        <h2>나의 인생 웹툰</h2>
        <input class="account-life-edit-input" type="text" value="${C.escape(current)}" aria-label="나의 인생 웹툰" data-account-life-input />
        <div class="account-sheet-actions">
          <button class="account-sheet-cancel" type="button" data-close-modal>취소</button>
          <button class="account-sheet-submit" type="button" data-action="confirm-account-life">수정하기</button>
        </div>
      `,
    );
  }

  function renderAccountExpInfoSheet() {
    const rows = [
      ["퀴즈 완료", "구간별 15-70 EXP"],
      ["출석체크", "매일 15 EXP"],
      ["연속 출석", "일주일마다 추가"],
      ["일일 미션 완료", "30 EXP"],
      ["레벨 달성", "5 레벨당 쿠키 1"],
    ];
    return `
      <div class="modal-layer account-exp-info-layer" role="presentation">
        <section class="modal account-exp-info-modal" role="dialog" aria-modal="true" aria-label="시즌 레벨 / EXP 정리">
          <button class="storit-modal-close modal-close account-exp-info-close" type="button" data-close-modal aria-label="닫기">×</button>
          <h2>시즌 레벨 / EXP 정리</h2>
          <div class="account-exp-table" role="table" aria-label="시즌 레벨 EXP 보상 표">
            <div class="account-exp-table__row account-exp-table__row--head" role="row">
              <strong role="columnheader">항목</strong>
              <strong role="columnheader">보상</strong>
            </div>
            ${rows
              .map(
                ([label, reward]) => `
                  <div class="account-exp-table__row" role="row">
                    <span role="cell">${C.escape(label)}</span>
                    <span role="cell">${C.escape(reward)}</span>
                  </div>
                `,
              )
              .join("")}
          </div>
        </section>
      </div>
    `;
  }

  function renderButtons(buttons) {
    const rowClass = buttons.length > 1 ? "btn-row" : "";
    return `
      <div class="${rowClass}">
        ${buttons
          .map(([label, variant, action]) => {
            const route = action !== "close" ? `data-route="${action}"` : "";
            return `<button class="btn ${variant}" ${route} data-close-modal>${C.escape(label)}</button>`;
          })
          .join("")}
      </div>
    `;
  }

  function renderInviteSheet(options = {}) {
    const invite = inviteData();
    const isUnderlay = Boolean(options.underlay);
    const dialogAttrs = isUnderlay
      ? 'aria-hidden="true"'
      : `role="dialog" aria-modal="true" aria-label="${C.escape(invite.title)}"`;
    const copyAttrs = isUnderlay
      ? 'tabindex="-1" aria-hidden="true" disabled'
      : 'data-action="copy-invite-code"';
    return `
      <section class="modal invite-modal ${isUnderlay ? "invite-modal--underlay" : ""}" ${dialogAttrs}>
        <img class="invite-modal__mascot" src="${assetBase}invite-envelope-cookie.svg" alt="" loading="lazy" />
        <button class="storit-modal-close modal-close invite-modal__close" ${isUnderlay ? 'tabindex="-1" aria-hidden="true"' : "data-close-modal"} aria-label="닫기">×</button>
        <h2>${C.escape(invite.title)}</h2>
        <p>${C.escape(invite.description)}</p>
        <div class="invite-modal__code" aria-label="초대 코드">
          <span>${C.escape(invite.code)}</span>
          <button type="button" ${copyAttrs} aria-label="초대 코드 복사">
            <img src="${assetBase}invite-copy-icon.svg" alt="" loading="lazy" />
          </button>
        </div>
        <button class="invite-modal__cta" type="button">${C.escape(invite.primaryAction)}</button>
        <button class="invite-modal__reward-link" type="button" data-modal="inviteReward">${C.escape(invite.rewardLink)}</button>
      </section>
    `;
  }

  function renderInviteModal() {
    return `
      <div class="modal-layer invite-modal-layer" role="presentation">
        ${renderInviteSheet()}
      </div>
    `;
  }

  function renderInviteRewardRows() {
    return inviteData()
      .rewards.map(
        (row) => `
          <div class="invite-reward-modal__row">
            <span>${C.escape(row.condition)}</span>
            <span>${C.escape(row.reward)}</span>
          </div>
        `,
      )
      .join("");
  }

  function renderInviteRewardModal() {
    return `
      <div class="modal-layer invite-modal-layer invite-modal-layer--stacked invite-reward-layer" role="presentation">
        ${renderInviteSheet({ underlay: true })}
        <section class="modal invite-reward-modal" role="dialog" aria-modal="true" aria-label="친구 초대 별도 보상">
          <button class="storit-modal-close modal-close invite-reward-modal__close" data-action="close-invite-overlay" aria-label="닫기">×</button>
          <h2>친구 초대 별도 보상</h2>
          <div class="invite-reward-modal__table">
            <div class="invite-reward-modal__row invite-reward-modal__row--head">
              <strong>조건</strong>
              <strong>보상</strong>
            </div>
            ${renderInviteRewardRows()}
          </div>
        </section>
      </div>
    `;
  }

  function renderInviteCopyToast() {
    const invite = inviteData();
    return `
      <div class="modal-layer invite-modal-layer invite-modal-layer--stacked invite-copy-layer" role="presentation">
        ${renderInviteSheet({ underlay: true })}
        <section class="modal invite-copy-toast" role="status" aria-live="polite">
          <img class="invite-copy-toast__icon" src="${assetBase}invite-copy-toast-icon.svg" alt="" loading="lazy" />
          <h2>${C.escape(invite.copyToast)}</h2>
        </section>
      </div>
    `;
  }

  function renderQuitSolvingQuizModal() {
    return `
      <div class="modal-layer" role="presentation">
        <section class="modal compact modal-quitSolvingQuiz" role="dialog" aria-modal="true" aria-label="퀴즈를 푸는 중입니다. 정말 나가시겠습니까?">
          <button class="storit-modal-close modal-close" data-close-modal aria-label="닫기">×</button>
          <div class="modal-asset">
            <img src="${assetBase}quiz-quit-question.svg" alt="" loading="lazy" />
          </div>
          <h2>퀴즈를 푸는 중입니다.<br />정말 나가시겠습니까?</h2>
          <p>완료하지 않고 페이지를 벗어날 경우,<br />이번 퀴즈는 0점 처리됩니다.</p>
          <div class="btn-row">
            <button class="btn soft" type="button" data-route="home" data-close-modal>이동하기</button>
            <button class="btn orange" type="button" data-close-modal>계속풀기</button>
          </div>
        </section>
      </div>
    `;
  }

  function renderRankingSeasonRewardModal() {
    const rows = [
      ["1등", "쿠키 50개"],
      ["2등", "쿠키 30개"],
      ["3등", "쿠키 20개"],
      ["상위 5%", "쿠키 5개"],
      ["상위 10%", "쿠키 3개"],
      ["상위 20%", "쿠키 2개"],
    ];
    return `
      <div class="modal-layer ranking-season-reward-layer" role="presentation">
        <section class="modal ranking-season-reward-modal" role="dialog" aria-modal="true" aria-label="상위 20% 보상 세부안">
          <button class="storit-modal-close modal-close ranking-season-reward-modal__close" data-close-modal aria-label="닫기">×</button>
          <h2>상위 20% 보상 세부안</h2>
          <div class="ranking-season-reward-modal__table">
            <div class="ranking-season-reward-modal__row is-head"><strong>구간</strong><strong>보상</strong></div>
            ${rows
              .map(
                ([range, reward]) => `
                  <div class="ranking-season-reward-modal__row">
                    <span>${C.escape(range)}</span>
                    <span>${C.escape(reward)}</span>
                  </div>
                `,
              )
              .join("")}
          </div>
          <p>최대 300명 지급</p>
        </section>
      </div>
    `;
  }

  function restoreInviteAfterCopyToast() {
    window.clearTimeout(copyToastTimer);
    copyToastTimer = window.setTimeout(() => {
      const root = document.getElementById("modal-root");
      if (root?.querySelector(".invite-copy-layer")) root.innerHTML = renderInviteModal();
    }, 1000);
  }

  function open(name) {
    if (name === "invite") {
      window.clearTimeout(copyToastTimer);
      document.getElementById("modal-root").innerHTML = renderInviteModal();
      return;
    }

    if (name === "inviteReward") {
      window.clearTimeout(copyToastTimer);
      document.getElementById("modal-root").innerHTML = renderInviteRewardModal();
      return;
    }

    if (name === "quitSolvingQuiz") {
      window.clearTimeout(copyToastTimer);
      document.getElementById("modal-root").innerHTML = renderQuitSolvingQuizModal();
      return;
    }

    if (name === "rankingSeasonReward") {
      window.clearTimeout(copyToastTimer);
      document.getElementById("modal-root").innerHTML = renderRankingSeasonRewardModal();
      return;
    }

    if (name === "accountProfileEdit") {
      window.clearTimeout(copyToastTimer);
      document.getElementById("modal-root").innerHTML = renderAccountProfileSheet();
      return;
    }

    if (name === "accountGenreEdit") {
      window.clearTimeout(copyToastTimer);
      document.getElementById("modal-root").innerHTML = renderAccountGenreSheet();
      return;
    }

    if (name === "accountLifeEdit") {
      window.clearTimeout(copyToastTimer);
      document.getElementById("modal-root").innerHTML = renderAccountLifeSheet();
      return;
    }

    if (name === "accountExpInfo") {
      window.clearTimeout(copyToastTimer);
      document.getElementById("modal-root").innerHTML = renderAccountExpInfoSheet();
      return;
    }

    const modal = modalTemplates[name];
    if (!modal) return;
    const table = modal.table
      ? `
        <div class="modal-table">
          <div class="tr"><strong>조건</strong><strong>보상</strong></div>
          <div class="tr"><span>친구 가입 완료</span><span>쿠키 2개</span></div>
          <div class="tr"><span>친구 퀴즈 3회 참여</span><span>쿠키 3개</span></div>
          <div class="tr"><span>친구가 3일 출석</span><span>쿠키 5개</span></div>
        </div>
      `
      : "";
    document.getElementById("modal-root").innerHTML = `
      <div class="modal-layer" role="presentation">
        <section class="modal compact modal-${C.escape(name)}" role="dialog" aria-modal="true" aria-label="${C.escape(modal.title)}">
          <button class="storit-modal-close modal-close" data-close-modal aria-label="닫기">×</button>
          <div class="modal-asset">${C.icon(modal.icon)}</div>
          <h2>${C.escape(modal.title)}</h2>
          ${modal.text ? `<p>${C.escape(modal.text).replace(/\n/g, "<br />")}</p>` : ""}
          ${table}
          ${renderButtons(modal.buttons)}
        </section>
      </div>
    `;
  }

  function close() {
    window.clearTimeout(copyToastTimer);
    document.getElementById("modal-root").innerHTML = "";
  }

  function closeInviteOverlay() {
    window.clearTimeout(copyToastTimer);
    document.getElementById("modal-root").innerHTML = renderInviteModal();
  }

  function copyInviteCode() {
    const invite = inviteData();
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(invite.code).catch(() => {});
    }
    document.getElementById("modal-root").innerHTML = renderInviteCopyToast();
    restoreInviteAfterCopyToast();
  }

  document.addEventListener("click", (event) => {
    const overlayClose = event.target.closest('[data-action="close-invite-overlay"]');
    if (!overlayClose) return;
    event.preventDefault();
    event.stopPropagation();
    closeInviteOverlay();
  });

  window.StoritModals = { open, close, closeInviteOverlay, copyInviteCode };
})();
