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
      icon: "logout",
      title: "정말 로그아웃 하시겠습니까?",
      text: "쿠키 관련해서 중요한 정보를 알림으로 받지 못해요.",
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
      title: "작성중인 내용이 있습니다. 정말 나가시겠습니까?",
      text: "등록하지 않고 페이지를 벗어날 경우, 지금까지 작성한 내용이 사라집니다.",
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
        <button class="modal-close invite-modal__close" ${isUnderlay ? 'tabindex="-1" aria-hidden="true"' : "data-close-modal"} aria-label="닫기">×</button>
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
          <button class="modal-close invite-reward-modal__close" data-close-modal aria-label="닫기">×</button>
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
          <span class="invite-copy-toast__icon" aria-hidden="true"></span>
          <h2>${C.escape(invite.copyToast)}</h2>
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
          <button class="modal-close" data-close-modal aria-label="닫기">×</button>
          <div class="modal-asset">${C.icon(modal.icon)}</div>
          <h2>${C.escape(modal.title)}</h2>
          ${modal.text ? `<p>${C.escape(modal.text)}</p>` : ""}
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

  function copyInviteCode() {
    const invite = inviteData();
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(invite.code).catch(() => {});
    }
    document.getElementById("modal-root").innerHTML = renderInviteCopyToast();
    restoreInviteAfterCopyToast();
  }

  window.StoritModals = { open, close, copyInviteCode };
})();
