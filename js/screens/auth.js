(function () {
  const D = window.StoritData;
  const C = window.StoritComponents;
  const assetRoot = "./assets/figma-exported/named/";

  function asset(file) {
    return `${assetRoot}${file}`;
  }

  function image(file, className, alt = "") {
    return `<img class="${className}" src="${C.escape(asset(file))}" alt="${C.escape(alt)}" loading="lazy" />`;
  }

  function backIcon() {
    return image("icon-back-arrow.svg", "auth-back-icon", "");
  }

  function routeButton(label, route, className = "") {
    return `
      <button class="btn auth-cta ${className}" type="button" data-route="${C.escape(route)}">
        ${C.escape(label)}
      </button>
    `;
  }

  function wordmark(className = "") {
    return `<div class="auth-wordmark ${className}" aria-label="Storit">storit</div>`;
  }

  const termStorageKey = "storit.acceptedTerms";
  const profileStorageKey = "storit.profileCookie";
  const defaultProfileCookie = "profile-cookie-01.svg";
  const profileCookies = [
    "profile-cookie-07.svg",
    "profile-cookie-03.svg",
    "profile-cookie-04.svg",
    "profile-cookie-01.svg",
    "profile-cookie-02.svg",
    "profile-cookie-05.svg",
    "profile-cookie-08.svg",
    "profile-cookie-10.svg",
    "profile-cookie-06.svg",
  ];

  function readAcceptedTerms() {
    try {
      return JSON.parse(window.sessionStorage.getItem(termStorageKey) || "{}");
    } catch (error) {
      return {};
    }
  }

  function dots(activeIndex) {
    return `
      <div class="onboarding-dots auth-dots" aria-label="${activeIndex} / 3">
        ${[1, 2, 3]
          .map((dot) => `<span class="${dot === activeIndex ? "is-active" : ""}"></span>`)
          .join("")}
      </div>
    `;
  }

  function signupNickname() {
    try {
      return window.sessionStorage.getItem("storit.nickname") || "OO";
    } catch (error) {
      return "OO";
    }
  }

  function selectedProfileCookie() {
    try {
      const stored = window.sessionStorage.getItem(profileStorageKey);
      return profileCookies.includes(stored) ? stored : defaultProfileCookie;
    } catch (error) {
      return defaultProfileCookie;
    }
  }

  function loading() {
    return signupWelcome();
  }

  function signupWelcome() {
    const nickname = signupNickname();

    return `
      <section class="screen splash-screen auth-screen auth-post-signup auth-post-signup--welcome">
        <div class="auth-bg-layer auth-bg-layer--oven" aria-hidden="true"></div>
        <div class="auth-post-signup__brand auth-post-signup__brand--welcome">
          <p class="auth-post-signup__kicker auth-post-signup__kicker--welcome">웹툰 퀴즈 리워드 플랫폼</p>
          ${image("brand-storit.svg", "auth-post-signup__logo", "Storit")}
          <p class="auth-post-signup__headline">스토릿 오븐이 따뜻하게 예열되었어요!</p>
        </div>
        <div class="auth-welcome-stage">
          <div class="auth-welcome-smoke" aria-hidden="true">
            ${image("signup-complete-cloud.svg", "auth-welcome-smoke__cloud auth-welcome-smoke__cloud--1", "")}
            ${image("signup-complete-cloud.svg", "auth-welcome-smoke__cloud auth-welcome-smoke__cloud--2", "")}
            ${image("signup-complete-cloud.svg", "auth-welcome-smoke__cloud auth-welcome-smoke__cloud--3", "")}
            ${image("signup-complete-cloud.svg", "auth-welcome-smoke__cloud auth-welcome-smoke__cloud--4", "")}
          </div>
          <div class="auth-welcome-cloud" aria-live="polite">
            ${image("signup-complete-cloud.svg", "auth-welcome-cloud__image", "")}
            <p class="auth-welcome-message">
              <strong>환영합니다!</strong>
              <span>${C.escape(nickname)} 님</span>
            </p>
          </div>
          ${image("signup-complete-cookie.svg", "auth-welcome-chef", "")}
        </div>
        <div class="auth-bottom-action auth-post-signup__action">
          ${routeButton("쿠키 구우러 가기", "home", "auth-cta--dark")}
        </div>
      </section>
    `;
  }

  function onboarding(index) {
    const slides = [
      {
        id: "cookie",
        title: "퀴즈를 풀고<br /><mark>맛있는 쿠키</mark>를<br />만들어봐요!",
        text: "웹툰 속 이야기를 읽고 퀴즈를 풀면<br />쿠키와 보상이 가득!",
        bubbleHtml: "<span><mark>오늘의 쿠키</mark>가</span><strong>완성됐어요!</strong>",
        cta: "쿠키 획득하러 가기",
        route: "onboarding2",
        background: "oven",
        character: "onboarding1-chef.svg",
        ovenCookie: true,
      },
      {
        id: "ranking",
        title: "매일 달라지는 랭킹,<br /><mark>오늘의 주인공</mark>은 누구?",
        text: "웹툰 퀴즈를 풀고 1등을 노려보세요!<br />최대 5000원을 받을 수 있어요",
        bubble: "어제의 주인공을 발표합니다!",
        cta: "쿠키 획득하러 가기",
        route: "onboarding3",
        background: "ranking",
        character: "character-ranking-medal.svg",
      },
      {
        id: "shop",
        title: "쿠키를 모아, <mark>상점</mark>에서<br /><mark>보상</mark>을 교환하세요!",
        text: "",
        bubble: "갖고싶은 쿠키가 생겼드!",
        cta: "쿠키 획득하러 가기",
        route: "signup",
        background: "shop",
        character: "character-shop-back.svg",
      },
    ];
    const slide = slides[index - 1];

    return `
      <section class="screen onboarding-screen auth-screen auth-onboarding auth-onboarding--${slide.id}">
        <div class="auth-bg-layer auth-bg-layer--${slide.background}" aria-hidden="true"></div>
        <div class="auth-onboarding__copy">
          <p class="auth-kicker">스토릿 시작하기</p>
          <h1>${slide.title}</h1>
          <p>${slide.text}</p>
        </div>
        <div class="auth-onboarding__visual" aria-hidden="true">
          <span class="auth-confetti auth-confetti--one"></span>
          <span class="auth-confetti auth-confetti--two"></span>
          <span class="auth-confetti auth-confetti--three"></span>
          ${slide.ovenCookie ? image("onboarding1-cookie.svg", "auth-oven-cookie") : ""}
          <p class="auth-speech">${slide.bubbleHtml || C.escape(slide.bubble)}</p>
          ${image(slide.character, "auth-onboarding__character")}
        </div>
        <div class="auth-onboarding__bottom">
          ${routeButton(slide.cta, slide.route, "auth-cta--onboarding")}
          ${dots(index)}
        </div>
      </section>
    `;
  }

  function signup() {
    const socials = [
      ["kakao", "icon-social-kakao.svg", "카카오로 회원가입"],
      ["naver", "icon-social-naver.svg", "네이버로 회원가입"],
      ["google", "icon-social-google.svg", "구글로 회원가입"],
    ];

    return `
      <section class="screen signup-screen auth-screen auth-signup">
        ${image("signup-curtain.svg", "auth-signup__curtain")}
        ${image("signup-lamp.svg", "auth-signup__lamp")}
        <div class="auth-signup__hero">
          <p class="auth-kicker">웹툰 퀴즈 리워드 플랫폼</p>
          ${image("brand-storit.svg", "auth-signup__brand", "Storit")}
        </div>
        <div class="auth-social-stack" aria-label="소셜 회원가입">
          ${socials
            .map(
              ([provider, iconFile, label]) => `
                <button class="social-button auth-social-button ${provider}" type="button" data-route="termsAgree" data-reset-terms="true">
                  ${image(iconFile, "auth-social-icon", "")}
                  <span>${C.escape(label)}</span>
                </button>
              `,
            )
            .join("")}
        </div>
      </section>
    `;
  }

  function termsAgree() {
    const rows = [
      ["[필수] 서비스 이용약관", "termService", true],
      ["[필수] 14세 이상 입니다", "termAge", true],
      ["[선택] 개인정보 수집 및 이용동의", "termPrivacy", false],
      ["[선택] 이벤트 및 마케팅 수신 동의", "termMarketing", false],
    ];
    const acceptedTerms = readAcceptedTerms();
    const isAccepted = (route) => acceptedTerms[route] === true;
    const allChecked = rows.every(([, route]) => isAccepted(route));
    const requiredChecked = rows.filter(([, , required]) => required).every(([, route]) => isAccepted(route));

    return `
      <section class="screen auth-screen auth-terms-agree-screen">
        <div class="auth-terms-agree-panel">
          <button class="auth-terms-back" type="button" data-route="signup" aria-label="뒤로가기">${backIcon()}</button>
          <section class="auth-terms-agree-hero">
            <h1>스토릿<br />이용약관 동의</h1>
            <p>스토릿 서비스 시작 및 가입을 위해<br />정보 제공에 동의해주세요!</p>
          </section>
          <button class="auth-terms-all ${allChecked ? "is-checked" : ""}" type="button" data-action="check" aria-pressed="${allChecked ? "true" : "false"}">
            ${image("icon-terms-check.svg", "auth-terms-check auth-terms-check--all", "")}
            <span>전체 약관동의</span>
          </button>
          <div class="auth-terms-agree-list">
            ${rows
              .map(
                ([label, route, required]) => `
                  <div class="auth-terms-agree-row ${isAccepted(route) ? "is-checked" : ""}">
                    <button class="auth-terms-row-check ${isAccepted(route) ? "is-checked" : ""}" type="button" data-action="terms-row-check" data-required="${required ? "true" : "false"}" data-term-route="${C.escape(route)}" aria-label="${C.escape(label)} 체크" aria-pressed="${isAccepted(route) ? "true" : "false"}">
                      ${image("icon-terms-check.svg", "auth-terms-check", "")}
                    </button>
                    <span class="auth-terms-row-label">${C.escape(label)}</span>
                    <button class="auth-terms-row-more" type="button" data-route="${C.escape(route)}" aria-label="${C.escape(label)} 자세히 보기">더보기</button>
                  </div>
                `,
              )
              .join("")}
          </div>
          <button class="btn auth-terms-next ${requiredChecked ? "is-ready" : ""}" type="button" data-route="userInfo" ${requiredChecked ? "" : "disabled"}>다음</button>
        </div>
      </section>
    `;
  }

  function userInfo() {
    const profileCookie = selectedProfileCookie();
    return `
      <section class="screen has-scallop auth-screen auth-userinfo-screen">
        <form class="auth-userinfo-panel" data-auth-userinfo-form novalidate>
          <button class="auth-userinfo-back" type="button" data-route="termsAgree" aria-label="뒤로가기">${backIcon()}</button>
          <section class="auth-userinfo-hero">
            <h1>유저정보</h1>
            <p>스토릿 서비스 시작을 위해 간단한<br />유저 정보를 입력해주세요!</p>
          </section>
          <div class="auth-userinfo-avatar" aria-label="프로필 이미지" data-action="open-profile-picker">
            ${image(profileCookie, "auth-userinfo-cookie", "")}
            <button class="auth-userinfo-edit" type="button" aria-label="프로필 수정" data-action="open-profile-picker">
              ${image("icon-user-profile-edit.svg", "auth-userinfo-edit-icon", "")}
            </button>
          </div>
          <section class="auth-userinfo-card" aria-label="유저 정보 입력">
            <label class="auth-userinfo-field">
              <span class="auth-userinfo-field-head">
                <span class="auth-userinfo-label">닉네임 <strong>*</strong></span>
                <small class="auth-userinfo-feedback" data-nickname-feedback aria-live="polite"></small>
              </span>
              <span class="auth-userinfo-input-wrap">
                ${image("icon-user-nickname.svg", "auth-userinfo-input-icon", "")}
                <input name="nickname" type="text" placeholder="닉네임 설정하기" autocomplete="nickname" required minlength="2" maxlength="10" data-nickname-input />
              </span>
            </label>
            <label class="auth-userinfo-field">
              <span class="auth-userinfo-label">출생연도 <strong>*</strong></span>
              <span class="auth-userinfo-input-wrap">
                ${image("icon-user-birth.svg", "auth-userinfo-input-icon auth-userinfo-input-icon--birth", "")}
                <input name="birthdate" type="text" placeholder="출생연도 입력하기" autocomplete="bday" required readonly data-action="open-calendar" data-birth-input />
              </span>
            </label>
            <div class="auth-userinfo-field auth-userinfo-field--gender">
              <span class="auth-userinfo-label">성별 <strong>*</strong></span>
              <div class="auth-userinfo-gender">
                <label>
                  <input type="radio" name="gender" value="female" />
                  <span>여성</span>
                </label>
                <label>
                  <input type="radio" name="gender" value="male" />
                  <span>남성</span>
                </label>
              </div>
            </div>
          </section>
          <p class="auth-userinfo-error" role="alert" aria-live="polite">필수 정보를 모두 입력해주세요.</p>
          <button class="btn auth-userinfo-next" type="submit" disabled>다음</button>
        </form>
        <div class="auth-profile-modal" data-profile-picker-modal hidden>
          <div class="auth-modal-dim" data-action="close-profile-picker"></div>
          <section class="auth-profile-sheet" role="dialog" aria-modal="true" aria-label="프로필 설정">
            <button class="auth-profile-sheet__close" type="button" data-action="close-profile-picker" aria-label="닫기">×</button>
            <h2>프로필 설정</h2>
            <div class="auth-profile-preview" aria-label="프로필 미리보기">
              ${image(profileCookie, "auth-profile-preview__image", "프로필 미리보기")}
            </div>
            <div class="auth-profile-grid">
              ${profileCookies
                .map(
                  (file, index) => `
                    <button class="auth-profile-option ${file === profileCookie ? "is-selected" : ""}" type="button" data-action="select-profile-cookie" data-profile-cookie="${C.escape(file)}" aria-label="프로필 쿠키 ${index + 1}">
                      ${image(file, "auth-profile-option__image", "")}
                      <span class="auth-profile-option__check" aria-hidden="true"></span>
                    </button>
                  `,
                )
                .join("")}
            </div>
            <button class="auth-profile-album" type="button">앨범에서 사진 선택</button>
            <button class="btn auth-profile-confirm" type="button" data-action="confirm-profile-cookie">확인</button>
          </section>
        </div>
        <div class="auth-calendar-modal" data-calendar-modal hidden>
          <div class="auth-modal-dim" data-action="close-calendar"></div>
          <section class="auth-calendar-sheet" role="dialog" aria-modal="true" aria-label="출생연도 선택">
            ${image("userinfo-calendar-panel.svg", "auth-calendar-sheet__art", "")}
            <button class="auth-calendar-x" type="button" data-action="close-calendar" aria-label="닫기"></button>
            <strong class="auth-calendar-title" data-calendar-title>2026년 6월</strong>
            <div class="auth-calendar-week" aria-hidden="true">
              <span>일</span><span>월</span><span>화</span><span>수</span><span>목</span><span>금</span><span>토</span>
            </div>
            <div class="auth-calendar-grid" data-calendar-grid></div>
            <button class="btn auth-calendar-close" type="button" data-action="confirm-calendar-date" data-calendar-confirm>2026년 6월 15일 선택</button>
          </section>
        </div>
        <div class="auth-notification-modal" data-notification-modal hidden>
          <div class="auth-modal-dim"></div>
          <section class="auth-notification-sheet" role="dialog" aria-modal="true" aria-label="알림 설정">
            ${image("notification-permission-modal.svg", "auth-notification-sheet__art", "")}
            <button class="auth-notification-close" type="button" data-action="close-notification-permission" aria-label="닫기"></button>
            <button class="auth-notification-button auth-notification-button--allow" type="button" data-action="complete-notification-permission" aria-label="알림받기"></button>
            <button class="auth-notification-button auth-notification-button--later" type="button" data-action="complete-notification-permission" aria-label="나중에하기"></button>
          </section>
        </div>
      </section>
    `;
  }

  function termDoc(kind, title) {
    const termContent = {
      service: {
        tone: "long",
        sections: [
          [
            "제1조 (목적)",
            '본 약관은 프레시밀크(이하 "회사")가 제공하는 스토릿(Storit)(이하 "서비스")의 이용과 관련하여 회사와 회원 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.',
          ],
          [
            "제2조 (회원가입 및 이용계약 체결)",
            "① 이용계약은 가입신청자가 카카오, 네이버, 구글 등의 소셜 계정을 통해 약관에 동의하고 가입을 신청한 후, 회사가 이를 승낙함으로써 체결됩니다.\n② 가입신청자가 만 14세 미만의 아동인 경우, 관련 법령에 따라 법정대리인(부모 등)의 동의를 얻어야 회원가입 및 서비스 이용이 가능합니다. 회사는 법정대리인의 동의가 확인되지 않은 경우 이용계약을 취소하거나 서비스 이용을 제한할 수 있습니다.",
          ],
          [
            "제3조 (리워드 및 포인트 정책)",
            "① 회원은 서비스 내 웹툰 퀴즈 정답, 이벤트 참여 등의 활동을 통해 회사에서 정한 기준에 따라 포인트(또는 리워드)를 적립 받을 수 있습니다.\n② 적립된 포인트는 회사가 정한 방법 및 제휴처에서 사용할 수 있으며, 현금 환급 가능 여부 및 비율은 서비스 내 별도 고지한 바에 따릅니다.\n③ (부정 적립 금지) 회원은 매크로 프로그램 사용, 타인의 명의 도용, 시스템 오류 악용 등 부정한 방법으로 포인트를 적립할 수 없습니다. 회사는 부정 적립이 확인된 경우 포인트 회수, 회원 자격 정지 및 영구 탈퇴 조치를 취할 수 있으며 민·형사상의 책임을 물을 수 있습니다.\n④ 포인트의 유효기간은 적립일로부터 1년이며, 유효기간이 경과한 포인트는 순차적으로 자동 소멸됩니다. 회원 탈퇴 시 남아있는 포인트는 즉시 소멸되므로 재가입하더라도 복구되지 않습니다.",
          ],
          [
            "제4조 (회원의 게시물 및 퀴즈 저작권)",
            "① 회원이 서비스 내에서 직접 생성하고 출제한 웹툰 퀴즈 및 관련 콘텐츠에 대한 저작권(2차적 저작물 작성권 포함) 및 모든 지식재산권은 회사(프레시밀크)에 귀속됩니다.\n② 회원이 서비스 내에 작성한 리뷰, 커뮤니티 게시글 등 일반 게시물의 저작권은 해당 회원에게 귀속됩니다. 다만, 회사는 이를 서비스의 프로모션, 운영, 서비스 개선 및 마케팅 목적으로 사용할 수 있는 무상의 비독점적 사용권을 가집니다.\n③ 회원의 게시물이나 퀴즈가 타인의 지식재산권을 침해하거나 관련 법령을 위반하는 경우, 회사는 사전 통보 없이 이를 삭제하거나 노출을 제한할 수 있으며, 이로 인해 발생하는 모든 법적 책임은 해당 회원이 부담합니다.",
          ],
          [
            "제5조 (서비스의 변경 및 중지)",
            "회사는 운영상, 기술상의 필요에 따라 제공하고 있는 서비스를 변경하거나 중단할 수 있으며, 이 경우 사전에 공지사항을 통해 안내합니다. 단, 리워드 정책 등 회원의 권리에 중대한 영향을 미치는 변경은 최소 30일 전에 통지합니다.",
          ],
        ],
      },
      age: {
        tone: "short",
        sections: [
          [
            "",
            "스토릿(Storit)은 관련 법령에 의거하여 만 14세 미만 아동의 개인정보 보호를 위해 회원가입을 제한하고 있습니다.\n\n본 서비스는 만 14세 이상인 이용자만 가입 및 이용이 가능합니다. 가입 신청자는 본인의 연령이 만 14세 이상임을 확인하며, 이에 동의합니다. 만약 만 14세 미만의 아동이 타인의 명의를 도용하는 등 허위로 가입한 사실이 확인될 경우, 회사는 사전 통보 없이 서비스 이용 제한 및 회원 탈퇴 조치를 취할 수 있습니다.",
          ],
        ],
      },
      privacy: {
        tone: "long",
        sections: [
          [
            "1. 수집하는 개인정보의 항목 및 수집 방법",
            "회사는 소셜 로그인 및 서비스 제공을 위해 아래의 개인정보를 수집합니다.\n가입 시 (소셜 연동): 이메일 주소, 닉네임, 프로필 사진\n리워드 사용 및 환급 시 (필요 시): 본인인증 정보(CI/DI), 휴대전화 번호, 은행 계좌번호\n자동 수집 항목: 서비스 이용기록(퀴즈 참여 이력, 리워드 적립/사용 내역, 리뷰 및 커뮤니티 활동, 길드 활동 정보), 접속 로그, IP 주소, 불량 이용 기록\n만 14세 미만 아동 가입 시: 법정대리인의 정보 (이름, 연락처, 동의 의사 확인 기록)",
          ],
          [
            "2. 개인정보의 수집 및 이용 목적",
            "회원 관리: 소셜 계정을 통한 본인 식별, 불량 회원의 부정 이용 방지, 만 14세 미만 아동 확인 및 법정대리인 동의 여부 확인\n서비스 및 리워드 제공: 웹툰 퀴즈 서비스 제공, 리워드(포인트) 적립 및 정산, 맞춤형 콘텐츠 제공\n신규 서비스 및 마케팅: 신규 기능(커뮤니티, 길드 등) 개발을 위한 통계 분석, 이벤트 및 광고성 정보 제공(동의한 경우에 한함)",
          ],
          [
            "3. 개인정보의 보유 및 이용 기간",
            "원칙적으로 회원 탈퇴 시 또는 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 부정이용 및 어뷰징 방지를 위해 탈퇴 후에도 6개월간 최소한의 식별 정보(탈퇴 기록 및 불량 이용 기록)를 보관할 수 있으며, 관련 법령에 따라 보존할 의무가 있는 경우 아래와 같이 보관합니다.\n전자상거래 등에서의 소비자보호에 관한 법률에 따른 대금결제 및 재화 등의 공급에 관한 기록: 5년",
          ],
          [
            "4. 개인정보의 파기 절차 및 방법",
            "파기 절차: 목적이 달성된 개인정보는 내부 방침 및 기타 관련 법령에 의한 정보보호 사유에 따라 일정 기간 저장된 후 파기됩니다.\n파기 방법: 전자적 파일 형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 완전히 삭제합니다.",
          ],
          [
            "5. 이용자 및 법정대리인의 권리와 행사 방법",
            "이용자 및 만 14세 미만 아동의 법정대리인은 언제든지 등록되어 있는 자신 혹은 당해 아동의 개인정보를 조회하거나 수정할 수 있으며, 동의 철회(회원 탈퇴)를 요청할 수 있습니다.\n해당 권리는 서비스 내 설정/마이페이지 메뉴 또는 개인정보 보호책임자에게 서면, 이메일 등을 통해 행사하실 수 있습니다.",
          ],
          [
            "6. 개인정보 보호책임자",
            "회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 이용자의 불만 처리 및 피해 구제를 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.\n담당자: 김동신\n이메일: kdshin@freshmilk.kr",
          ],
        ],
      },
      marketing: {
        tone: "medium",
        customHtml: `
          <section>
            <p>프레시밀크는 스토릿(Storit) 서비스의 다양한 혜택 및 정보를 제공하기 위해 아래와 같이 마케팅 목적의 개인정보를 처리합니다.</p>
            <ul>
              <li>수집 및 이용 목적: 서비스의 신규 기능 안내, 웹툰 퀴즈 관련 맞춤형 이벤트 알림, 프로모션 및 광고성 정보 제공, 혜택 안내</li>
              <li>수집 항목: 이메일 주소, 서비스 이용 기록(퀴즈 참여 및 리워드 적립 이력)</li>
              <li>보유 및 이용 기간: 회원 탈퇴 시까지 또는 선택 동의 철회 시까지</li>
            </ul>
            <p>※ 본 동의는 선택 사항이며, 동의하지 않으셔도 스토릿의 웹툰 퀴즈 풀이 및 기본 리워드 적립 서비스는 정상적으로 이용하실 수 있습니다. 다만, 신규 이벤트 및 맞춤형 혜택 안내가 제한될 수 있습니다. 본 동의는 서비스 내 설정 메뉴에서 언제든지 철회(수신 거부) 가능합니다.</p>
          </section>
        `,
      },
    };
    const doc = termContent[kind];
    const routeByKind = {
      service: "termService",
      age: "termAge",
      privacy: "termPrivacy",
      marketing: "termMarketing",
    };

    return `
      <section class="screen has-scallop auth-screen auth-term-detail-screen auth-term-detail-screen--${doc.tone}">
        <div class="auth-term-detail-panel">
          <button class="auth-term-detail-back" type="button" data-route="termsAgree" aria-label="뒤로가기">${backIcon()}</button>
          <h1 class="auth-term-detail-title">${C.escape(title)}</h1>
          <article class="auth-doc-card">
          ${
            doc.customHtml ||
            doc.sections
              .map(
                ([heading, text]) => `
                <section>
                  ${heading ? `<h2>${C.escape(heading)}</h2>` : ""}
                  <p>${C.escape(text).replace(/\n/g, "<br />")}</p>
                </section>
              `,
              )
              .join("")
          }
          </article>
          <button class="btn auth-term-detail-confirm" type="button" data-route="termsAgree" data-term-confirm="${routeByKind[kind]}">확인 완료</button>
        </div>
      </section>
    `;
  }

  window.StoritScreenRegistry.register({
    loading,
    signupWelcome,
    onboarding1: () => onboarding(1),
    onboarding2: () => onboarding(2),
    onboarding3: () => onboarding(3),
    signup,
    termsAgree,
    userInfo,
    termService: () => termDoc("service", "서비스 이용약관"),
    termAge: () => termDoc("age", "14세 이상 이용약관"),
    termPrivacy: () => termDoc("privacy", "개인정보 처리 방침"),
    termMarketing: () => termDoc("marketing", "이벤트 및 마케팅 수신 동의"),
  });
})();
