(function () {
  const D = window.StoritData;
  const C = window.StoritComponents;
  const assetBase = './assets/figma-exported/named/';

  const achievements = [
    { icon: '10', label: '최고 랭킹', value: '10위', meta: '상위 4%', tone: 'gold' },
    { icon: '7', label: '행운 횟수', value: '7회', meta: '보너스 적중', tone: 'mint' },
    { icon: '99', label: '최고 점수', value: '98.8점', meta: '정확도 최고', tone: 'blue' },
    { icon: '15', label: '연속 출석', value: '15일', meta: '꾸준함 유지', tone: 'lilac' },
  ];

  const cookieStats = [
    { label: '보유', value: D.user.cookie, suffix: '개' },
    { label: '누적 획득', value: '1,240', suffix: '개' },
    { label: '누적 사용', value: '1,160', suffix: '개' },
  ];

  const preferenceCards = [
    { label: '인생 웹툰', value: '기자매', meta: '최근 수정 3일 전', modal: 'accountLifeEdit' },
    { label: '좋아하는 장르', value: '공포, 스릴러', meta: '추천 퀴즈 반영 중', modal: 'accountGenreEdit' },
  ];

  const shortcutCards = [
    { icon: 'gift', title: '내 보관함', desc: '사용 가능한 상품권 2개', action: '보관함 가기', route: 'vault' },
    { icon: 'myQuiz', title: '내 퀴즈', desc: '심사 결과 확인 1건', action: '내 퀴즈 보기', route: 'myQuiz' },
  ];

  const notificationTabs = [
    { id: 'news', label: '새 소식', route: 'notifications' },
    { id: 'done', label: '확인 완료', route: 'notificationsDone' },
    { id: 'notice', label: '공지사항', route: 'notificationsNotice' },
  ];

  const notificationGroups = {
    news: [
      { icon: 'noticeCookieOpen', title: D.notices[0][0], body: D.notices[0][1], action: D.notices[0][2], tone: 'cookie' },
      { icon: 'noticeTrophy', title: D.notices[1][0], body: D.notices[1][1], action: D.notices[1][2], tone: 'rank' },
      { icon: 'cookiePaid', title: D.notices[2][0], body: D.notices[2][1], action: D.notices[2][2], tone: 'cookie' },
      { icon: 'megaphone', title: D.notices[3][0], body: D.notices[3][1], action: D.notices[3][2], tone: 'notice' },
      { icon: 'clipboard', title: D.notices[4][0], body: D.notices[4][1], action: D.notices[4][2], tone: 'done' },
      { icon: 'reject', title: D.notices[5][0], body: D.notices[5][1], action: D.notices[5][2], tone: 'reject' },
    ],
    done: [
      { icon: 'noticeTrophy', title: D.notices[1][0], body: D.notices[1][1], action: '8/8', tone: 'rank' },
      { icon: 'noticeCookieOpen', title: D.notices[0][0], body: D.notices[0][1], action: '8/9', tone: 'cookie' },
      { icon: 'cookiePaid', title: D.notices[2][0], body: D.notices[2][1], action: '8/5', tone: 'cookie' },
      { icon: 'megaphone', title: D.notices[3][0], body: D.notices[3][1], action: '5/3', tone: 'notice' },
      { icon: 'clipboard', title: D.notices[4][0], body: D.notices[4][1], action: '3/3', tone: 'done' },
      { icon: 'reject', title: D.notices[5][0], body: D.notices[5][1], action: '2/3', tone: 'reject' },
    ],
    notice: [
      { icon: 'megaphone', title: '새 공지사항이 등록되었어요!', body: '스토릿에 오신 여러분을 환영합니다.', action: '확인하기', tone: 'notice', route: 'noticeWelcome', pinned: true },
      { icon: 'megaphone', title: '새 공지사항이 등록되었어요!', body: '서비스 안정화를 위한 점검이 진행됩니...', action: '확인하기', tone: 'notice', route: 'noticeMaintenance' },
      { icon: 'megaphone', title: '새 공지사항이 등록되었어요!', body: '상품권 관련 오류 개선사항입니다.', action: '확인하기', tone: 'notice', route: 'noticeMaintenance' },
      { icon: 'megaphone', title: '새 공지사항이 등록되었어요!', body: '스토릿에 오신 여러분을 환영합니다.', action: '확인하기', tone: 'notice', route: 'noticeWelcome' },
    ],
  };

  const noticeDetails = {
    noticeWelcome: {
      title: '스토릿에 오신 여러분을 환영합니다.',
      prev: '서비스 안정화를 위한 점..',
      next: '서비스 안정화를 위한 점..',
      body: [
        '안녕하세요, 스토릿입니다.',
        '스토릿은 좋아하는 작품을 더 재미있게 즐길 수 있도록 만든 팬덤 퀴즈 커뮤니티입니다.',
        '작품을 읽고 퀴즈를 풀고, 포인트를 모으고, 랭킹에 도전해보세요.',
        '앞으로 다양한 작품 퀴즈와 이벤트가 계속 업데이트 될 예정입니다.',
        '스토릿에서 여러분만의 덕력을 마음껏 보여주세요!',
        '감사합니다.',
      ],
    },
    noticeMaintenance: {
      title: '서비스 안정화를 위한 점검이 진행됩니다.',
      prev: '서비스 안정화를 위한 점..',
      next: '서비스 안정화를 위한 점..',
      body: [
        '안녕하세요, 스토릿입니다.',
        '더 안정적인 서비스 이용을 위해 아래 시간 동안 점검이 진행될 예정입니다.',
        '점검 시간 동안에는 일부 기능 이용이 제한될 수 있습니다.',
        '점검 일시: 2026.06.15 02:00 ~ 03:00\n점검 내용: 퀴즈 참여 및 포인트 시스템 안정화',
        '이용에 불편을 드려 죄송합니다.\n더 나은 서비스로 보답하겠습니다.',
        '감사합니다.',
      ],
    },
  };

  const settingsGroups = [
    {
      title: '알림 설정',
      desc: '필요한 소식만 받을 수 있어요.',
      rows: [
        { label: '퀴즈 알림', desc: '새 퀴즈와 심사 결과', action: 'toggle', on: true },
        { label: '랭킹 알림', desc: '순위 변동과 TOP30 근접 알림', action: 'toggle', on: true },
        { label: '이벤트 알림', desc: '쿠키 보너스와 기간 한정 혜택', action: 'toggle', on: true },
      ],
    },
    {
      title: '계정 설정',
      desc: '로그인과 회원 정보를 관리해요.',
      rows: [
        { label: '로그아웃', desc: '현재 기기에서만 로그아웃', modal: 'logout' },
        { label: '회원 탈퇴', desc: '쿠키와 보관함 내역이 삭제돼요.', route: 'withdraw', danger: true },
      ],
    },
    {
      title: '기타',
      desc: '약관과 고객 지원을 확인해요.',
      rows: [
        { label: '문의하기', desc: '불편한 점을 남겨주세요.', route: 'inquiry' },
        { label: '이용약관', desc: '서비스 이용 기준', route: 'settingsTermService' },
        { label: '개인정보 처리방침', desc: '수집 및 이용 항목', route: 'settingsTermPrivacy' },
      ],
    },
  ];

  const settingsLegalDocs = {
    service: {
      title: '이용약관',
      heading: '스토릿(Storit)서비스 이용약관',
      sections: [
        [
          '제1조 (목적)',
          '본 약관은 프레시밀크(이하 "회사")가 제공하는 스토릿(Storit)(이하 "서비스")의 이용과 관련하여 회사와 회원 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.',
        ],
        [
          '제2조 (회원가입 및 이용계약 체결)',
          '① 이용계약은 가입신청자가 카카오, 네이버, 구글 등의 소셜 계정을 통해 약관에 동의하고 가입을 신청한 후, 회사가 이를 승낙함으로써 체결됩니다.\n② 가입신청자가 만 14세 미만의 아동인 경우, 관련 법령에 따라 법정대리인(부모 등)의 동의를 얻어야 회원가입 및 서비스 이용이 가능합니다. 회사는 법정대리인의 동의가 확인되지 않은 경우 이용계약을 취소하거나 서비스 이용을 제한할 수 있습니다.',
        ],
        [
          '제3조 (리워드 및 포인트 정책)',
          '① 회원은 서비스 내 웹툰 퀴즈 정답, 이벤트 참여 등의 활동을 통해 회사에서 정한 기준에 따라 포인트(또는 리워드)를 적립 받을 수 있습니다.\n② 적립된 포인트는 회사가 정한 방법 및 제휴처에서 사용할 수 있으며, 현금 환급 가능 여부 및 비율은 서비스 내 별도 고지한 바에 따릅니다.\n③ (부정 적립 금지) 회원은 매크로 프로그램 사용, 타인의 명의 도용, 시스템 오류 악용 등 부정한 방법으로 포인트를 적립할 수 없습니다. 회사는 부정 적립이 확인된 경우 포인트 회수, 회원 자격 정지 및 영구 탈퇴 조치를 취할 수 있으며 민·형사상의 책임을 물을 수 있습니다.\n④ 포인트의 유효기간은 적립일로부터 1년이며, 유효기간이 경과한 포인트는 순차적으로 자동 소멸됩니다. 회원 탈퇴 시 남아있는 포인트는 즉시 소멸되므로 재가입하더라도 복구되지 않습니다.',
        ],
        [
          '제4조 (회원의 게시물 및 퀴즈 저작권)',
          '① 회원이 서비스 내에서 직접 생성하고 출제한 웹툰 퀴즈 및 관련 콘텐츠에 대한 저작권(2차적 저작물 작성권 포함) 및 모든 지식재산권은 회사(프레시밀크)에 귀속됩니다.\n② 회원이 서비스 내에 작성한 리뷰, 커뮤니티 게시글 등 일반 게시물의 저작권은 해당 회원에게 귀속됩니다. 다만, 회사는 이를 서비스의 프로모션, 운영, 서비스 개선 및 마케팅 목적으로 사용할 수 있는 무상의 비독점적 사용권을 가집니다.\n③ 회원의 게시물이나 퀴즈가 타인의 지식재산권을 침해하거나 관련 법령을 위반하는 경우, 회사는 사전 통보 없이 이를 삭제하거나 노출을 제한할 수 있으며, 이로 인해 발생하는 모든 법적 책임은 해당 회원이 부담합니다.',
        ],
        [
          '제5조 (서비스의 변경 및 중지)',
          '회사는 운영상, 기술상의 필요에 따라 제공하고 있는 서비스를 변경하거나 중단할 수 있으며, 이 경우 사전에 공지사항을 통해 안내합니다. 단, 리워드 정책 등 회원의 권리에 중대한 영향을 미치는 변경은 최소 30일 전에 통지합니다.',
        ],
      ],
    },
    privacy: {
      title: '개인정보 처리 방침',
      heading: '스토릿(Storit) 개인정보 처리방침',
      sections: [
        [
          '1. 수집하는 개인정보의 항목 및 수집 방법',
          '회사는 소셜 로그인 및 서비스 제공을 위해 아래의 개인정보를 수집합니다.\n가입 시(소셜 연동): 이메일 주소, 닉네임, 프로필 사진\n리워드 사용 및 환급 시(필요 시): 본인인증 정보(CI/DI), 휴대전화 번호, 은행 계좌번호\n자동 수집 항목: 서비스 이용기록, 접속 로그, IP 주소, 불량 이용 기록\n만 14세 미만 아동 가입 시: 법정대리인의 정보 (이름, 연락처, 동의 의사 확인 기록)',
        ],
        [
          '2. 개인정보의 수집 및 이용 목적',
          '회원 관리: 소셜 계정을 통한 본인 식별, 불량 회원의 부정 이용 방지, 만 14세 미만 아동 확인 및 법정대리인 동의 여부 확인\n서비스 및 리워드 제공: 웹툰 퀴즈 서비스 제공, 리워드(포인트) 적립 및 정산, 맞춤형 콘텐츠 제공\n신규 서비스 및 마케팅: 신규 기능(커뮤니티, 길드 등) 개발을 위한 통계 분석, 이벤트 및 광고성 정보 제공(동의한 경우에 한함)',
        ],
        [
          '3. 개인정보의 보유 및 이용 기간',
          '원칙적으로 회원 탈퇴 시 또는 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 부정이용 및 어뷰징 방지를 위해 탈퇴 후에도 6개월간 최소한의 식별 정보(탈퇴 기록 및 불량 이용 기록)를 보관할 수 있으며, 관련 법령에 따라 보존할 의무가 있는 경우 아래와 같이 보관합니다.\n전자상거래 등에서의 소비자보호에 관한 법률에 따른 대금결제 및 재화 등의 공급에 관한 기록: 5년',
        ],
        [
          '4. 개인정보의 파기 절차 및 방법',
          '파기 절차: 목적이 달성된 개인정보는 내부 방침 및 기타 관련 법령에 의한 정보보호 사유에 따라 일정 기간 저장된 후 파기됩니다.\n파기 방법: 전자적 파일 형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 완전히 삭제합니다.',
        ],
        [
          '5. 이용자 및 법정대리인의 권리와 행사 방법',
          '이용자 및 만 14세 미만 아동의 법정대리인은 언제든지 등록되어 있는 자신 혹은 당해 아동의 개인정보를 조회하거나 수정할 수 있으며, 동의 철회(회원 탈퇴)를 요청할 수 있습니다.\ 해당 권리는 서비스 내 설정/마이페이지 메뉴 또는 개인정보 보호책임자에게 서면, 이메일 등을 통해 행사하실 수 있습니다.',
        ],
        [
          '6. 개인정보 보호책임자',
          '회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 이용자의 불만 처리 및 피해 구제를 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.\n담당자: 김동신\n이메일: kdshin@freshmilk.kr',
        ],
      ],
    },
  };

  const cookieRows = [
    {
      dateLabel: '2024.05.17',
      title: '오늘의 미션 완료',
      subtitle: '쿠키 1개 적립',
      amount: '+1',
      time: '14:32',
      kind: 'earn',
      icon: 'cookie-history-mission-complete.svg',
    },
    {
      dateLabel: '2024.05.17',
      title: '친구 초대 보상',
      subtitle: '친구 가입 완료 보상',
      amount: '+2',
      time: '14:32',
      kind: 'earn',
      icon: 'cookie-history-friend-reward.svg',
    },
    {
      dateLabel: '2024.05.17',
      title: '랭킹 1위 보상',
      subtitle: '쿠키 50개 적립',
      amount: '+50',
      time: '14:32',
      kind: 'earn',
      icon: 'cookie-history-ranking-first.svg',
    },
    {
      dateLabel: '2024.05.16',
      title: '행운의 등수 달성',
      subtitle: '쿠키 20개 적립',
      amount: '+20',
      time: '14:32',
      kind: 'earn',
      icon: 'cookie-history-lucky-rank.svg',
    },
    {
      dateLabel: '2024.05.16',
      title: '상품권 교환',
      subtitle: '쿠키 30개 사용',
      amount: '-30',
      time: '14:32',
      kind: 'use',
      icon: 'cookie-history-voucher-exchange.svg',
    },
    {
      dateLabel: '2024.05.16',
      title: '랭킹 Top 30 보상',
      subtitle: '쿠키 1개 적립',
      amount: '+1',
      time: '14:32',
      kind: 'earn',
      icon: 'cookie-history-ranking-top30.svg',
    },
  ];

  function sectionTitle(title, desc = '') {
    return `
      <div class="account-section-title">
        <h2>${C.escape(title)}</h2>
        ${desc ? `<p>${C.escape(desc)}</p>` : ''}
      </div>
    `;
  }

  function profileSummary() {
    return `
      <section class="account-profile-card" aria-label="프로필 요약">
        <div class="account-profile-card__avatar">${C.asset('character', 'avatar', 'account-profile-card__asset')}</div>
        <div class="account-profile-card__body">
          <div class="account-profile-card__top">
            <div>
              <span class="account-eyebrow">프로필 요약</span>
              <h2>${C.escape(D.user.name)}</h2>
            </div>
            <button class="account-text-button" data-modal="accountProfileEdit">수정</button>
          </div>
          <div class="account-level-row">
            <strong>LV. ${C.escape(D.user.level)}</strong>
            <span>다음 레벨까지 120 EXP</span>
          </div>
          ${C.progress(D.user.progress)}
          <div class="account-profile-card__metrics" aria-label="프로필 주요 지표">
            <span>쿠키 <strong>${C.escape(D.user.cookie)}</strong></span>
            <span>점수 <strong>${C.escape(D.user.score)}</strong></span>
            <span>랭킹 <strong>${C.escape(D.user.rank)}위</strong></span>
          </div>
        </div>
      </section>
    `;
  }

  function achievementCard() {
    return `
      <section class="account-card account-achievement-card">
        <div class="account-achievement-card__hero">
          <div>
            ${sectionTitle('나의 업적', '이번 달 기록을 한눈에 확인해요.')}
            <strong>랭킹 10위 달성</strong>
          </div>
          ${C.asset('character', 'ranking', 'account-achievement-card__asset')}
        </div>
        <div class="account-achievement-grid">
          ${achievements
            .map(
              (item) => `
                <article class="account-achievement-tile is-${item.tone}">
                  <span>${C.escape(item.icon)}</span>
                  <strong>${C.escape(item.value)}</strong>
                  <p>${C.escape(item.label)}</p>
                  <small>${C.escape(item.meta)}</small>
                </article>
              `
            )
            .join('')}
        </div>
      </section>
    `;
  }

  function cookieHistoryCard() {
    return `
      <button class="account-card account-cookie-card" data-route="cookieHistory">
        ${C.asset('character', 'newspaper', 'account-cookie-card__asset')}
        <span class="account-cookie-card__copy">
          <strong>쿠키 내역 관리</strong>
          <small>획득과 사용 흐름을 확인해요.</small>
        </span>
        <span class="account-cookie-card__stats" aria-hidden="true">
          ${cookieStats
            .map(
              (stat) => `
                <span>
                  <small>${C.escape(stat.label)}</small>
                  <strong>${C.escape(stat.value)}${C.escape(stat.suffix)}</strong>
                </span>
              `
            )
            .join('')}
        </span>
        <span class="account-card-arrow" aria-hidden="true">›</span>
      </button>
    `;
  }

  function preferenceCard(card) {
    return `
      <section class="account-preference-card">
        <span class="account-eyebrow">${C.escape(card.label)}</span>
        <strong>${C.escape(card.value)}</strong>
        <p>${C.escape(card.meta)}</p>
        <button class="account-mini-button" data-modal="${C.escape(card.modal)}">수정</button>
      </section>
    `;
  }

  function shortcutCard(card) {
    return `
      <section class="account-shortcut-card">
        <span class="account-shortcut-card__icon">${C.icon(card.icon)}</span>
        <div>
          <strong>${C.escape(card.title)}</strong>
          <p>${C.escape(card.desc)}</p>
        </div>
        <button class="account-mini-button" data-route="${C.escape(card.route)}">${C.escape(card.action)}</button>
      </section>
    `;
  }

  function missionProgressCard() {
    return `
      <section class="account-card account-mission-card">
        <div class="account-section-title account-section-title--inline">
          <div>
            <h2>오늘의 쿠키 제작</h2>
            <p>재료 3개 완료, 2개 남았어요.</p>
          </div>
          <button class="account-mini-button" data-route="mission">미션</button>
        </div>
        ${C.ingredientTrack(D.ingredients)}
      </section>
    `;
  }

  function tagCloudCard() {
    return `
      <section class="account-card account-tag-card">
        ${sectionTitle('나를 설명하는 태그')}
        <div class="account-tag-list">
          ${['#기자매', '#판타지 덕후', '#행운의 여신', '#퀴즈 장인'].map((tag) => C.pill(tag, 'soft')).join('')}
        </div>
      </section>
    `;
  }

  function myPage() {
    return C.shell({
      title: '마이페이지',
      back: 'home',
      activeNav: 'myPage',
      className: 'account-screen account-my-page account-my-page--final',
      right: `<button class="icon-button account-header-action account-header-gear" data-route="settings" aria-label="설정"><img src="${assetBase}icon-settings-gear.svg" alt="" loading="lazy" /></button>`,
      content: `
        <section class="account-final-profile" aria-label="프로필">
          <div class="account-final-profile__avatar">
            <img src="${assetBase}user-profile-cookie.svg" alt="" loading="lazy" />
          </div>
          <div class="account-final-profile__body">
            <div class="account-final-profile__name">
              <h2>${C.escape(D.user.name)}</h2>
              <button type="button" data-modal="accountProfileEdit">프로필 수정  <img class="account-shortcut-chevron" src="${assetBase}account-shortcut-chevron-right.svg" alt="" loading="lazy" /></button>
            </div>
            <div class="account-final-profile__level">
              <strong>LV. ${C.escape(D.user.level)}</strong>
              <div class="account-final-profile__bar"><span></span><em>67%</em></div>
            </div>
            <p>
              다음 레벨까지
              <button class="account-exp-trigger" type="button" data-modal="accountExpInfo">
                120 EXP <img class="account-inline-chevron" src="${assetBase}icon-chevron-right.svg" alt="" loading="lazy" />
              </button>
            </p>
          </div>
        </section>

        <section class="account-final-card account-final-achievements">
          <h3>나의 업적</h3>
          <div class="account-final-achievements__grid">
            <article>
              <img class="account-achievement-visual" src="${assetBase}icon-mypage-achievement-crown.svg" alt="" loading="lazy" />
              <strong>최고 랭킹</strong>
              <em>10위</em>
            </article>
            <article>
              <img class="account-achievement-visual" src="${assetBase}icon-mypage-achievement-clover.svg" alt="" loading="lazy" />
              <strong>행운 횟수</strong>
              <em>7회</em>
            </article>
            <article>
              <img class="account-achievement-visual" src="${assetBase}icon-mypage-achievement-score.svg" alt="" loading="lazy" />
              <strong>최고 점수</strong>
              <em>98.8점</em>
            </article>
            <article>
              <img class="account-achievement-visual" src="${assetBase}icon-mypage-achievement-calendar.svg" alt="" loading="lazy" />
              <strong>연속 출석</strong>
              <em>15일</em>
            </article>
          </div>
        </section>

        <section class="account-final-card account-final-cookie" data-route="cookieHistory">
          <img class="account-final-cookie__asset" src="${assetBase}icon-mypage-cookie-history.svg" alt="" loading="lazy" />
          <strong class="account-final-cookie__title">쿠키 내역 관리</strong>
          <span class="account-final-cookie__caption">보유 쿠키</span>
          <div class="account-final-cookie__stats">
            <span><small>보유 쿠키</small><strong>80</strong></span>
            <span><small>누적 획득</small><strong>1,240</strong></span>
            <span><small>누적 사용</small><strong>1,160</strong></span>
          </div>
          <img class="account-card-chevron" src="${assetBase}account-card-chevron-right.svg" alt="" loading="lazy" />
        </section>

        <div class="account-final-pref-grid">
          <section>
            <span>인생 웹툰</span>
            <strong>기자매</strong>
            <button type="button" data-modal="accountLifeEdit">수정하기</button>
          </section>
          <section>
            <span>좋아하는 장르</span>
            <strong>공포, 스릴러</strong>
            <button type="button" data-modal="accountGenreEdit">수정하기</button>
          </section>
        </div>

        <div class="account-final-shortcut-grid">
          <section>
            <span><img src="${assetBase}icon-mypage-vault-present.svg" alt="" loading="lazy" /> 내 보관함</span>
            <strong>사용 가능한<br />상품권 2개</strong>
            <button type="button" data-route="vault">보관함 가기 <img class="account-shortcut-chevron" src="${assetBase}account-shortcut-chevron-right.svg" alt="" loading="lazy" /></button>
          </section>
          <section>
            <span><img src="${assetBase}icon-mypage-myquiz-memo.svg" alt="" loading="lazy" /> 내 퀴즈</span>
            <strong>퀴즈 심사 결과<br />확인 1건</strong>
            <button type="button" data-route="myQuiz">내 퀴즈 가기 <img class="account-shortcut-chevron" src="${assetBase}account-shortcut-chevron-right.svg" alt="" loading="lazy" /></button>
          </section>
        </div>
      `,
    });
  }

  function notificationTabBar(active) {
    return `
      <div class="tabs account-tabs account-notification-tabs" role="tablist" aria-label="알림 분류">
        ${notificationTabs
          .map(
            (tab) => `
              <button class="tab ${active === tab.id ? 'is-active' : ''}" data-route="${C.escape(tab.route)}" role="tab">
                ${C.escape(tab.label)}
              </button>
            `
          )
          .join('')}
      </div>
    `;
  }

  function notificationRow(item) {
    const attrs = item.route ? `data-route="${C.escape(item.route)}"` : '';
    const isNoticeCookie = item.icon === 'cookiePlain' || item.icon === 'cookiePaid';
    const keepIconSize = item.icon === 'noticeCookieOpen' || item.icon === 'cookiePaid';
    const icon = isNoticeCookie ? `<img class="account-notice-cookie-solid" src="${assetBase}icon-notice-cookie-paid.svg" alt="" loading="lazy" />` : item.asset ? C.asset(item.assetType || 'icon', item.asset) : C.icon(item.icon);
    return `
      <article class="account-notice-row is-${C.escape(item.tone)} ${keepIconSize ? '' : 'is-icon-small'}" ${attrs}>
        <span class="account-notice-row__icon" aria-hidden="true">
          ${icon}
        </span>
        <div class="account-notice-row__body">
          <strong>${C.escape(item.title)}</strong>
          <p>${C.escape(item.body)}</p>
        </div>
        ${item.pinned ? `<img class="account-notice-row__pin" src="${assetBase}icon-notice-pin.svg" alt="" loading="lazy" />` : ''}
        <span class="account-notice-row__chip">${C.escape(item.action)}</span>
      </article>
    `;
  }

  function notifications(active = 'news') {
    const rows = notificationGroups[active] || notificationGroups.news;

    return C.shell({
      title: '알림',
      back: 'home',
      className: 'account-screen account-notification-screen',
      content: `
        ${notificationTabBar(active)}
        <section class="account-notification-panel">
          <div class="account-notice-list">
            ${rows.map(notificationRow).join('')}
          </div>
        </section>
      `,
    });
  }

  function noticeDetail(id = 'noticeWelcome') {
    const notice = noticeDetails[id] || noticeDetails.noticeWelcome;
    const paragraphs = notice.body.map((text) => `<p>${C.escape(text).replace(/\n/g, '<br />')}</p>`).join('');

    return C.shell({
      title: '공지사항',
      back: 'notificationsNotice',
      className: 'account-screen account-notice-detail-screen',
      content: `
        <section class="account-notice-detail-heading">
          <h2>${C.escape(notice.title)}</h2>
          <time>2026.06.14 | 17:07</time>
        </section>
        <article class="account-notice-detail-card">
          <div class="account-notice-detail-copy">${paragraphs}</div>
          <img class="account-notice-detail-character" src="${assetBase}notice-welcome-cookie.svg" alt="" loading="lazy" />
        </article>
        <nav class="account-notice-pager" aria-label="공지사항 이전 다음">
          <button type="button" data-route="noticeMaintenance">
            <img class="account-notice-pager__arrow" src="${assetBase}icon-notice-pager-prev.svg" alt="" loading="lazy" />
            <strong>이전글</strong>
            <small>${C.escape(notice.prev)}</small>
          </button>
          <button type="button" data-route="noticeWelcome">
            <strong>다음글</strong>
            <small>${C.escape(notice.next)}</small>
            <img class="account-notice-pager__arrow" src="${assetBase}icon-notice-pager-next.svg" alt="" loading="lazy" />
          </button>
        </nav>
      `,
    });
  }

  function settingsRow(row) {
    const attrs = [];
    if (row.action) attrs.push(`data-action="${C.escape(row.action)}"`);
    if (row.route) attrs.push(`data-route="${C.escape(row.route)}"`);
    if (row.modal) attrs.push(`data-modal="${C.escape(row.modal)}"`);

    return `
      <button class="account-settings-row ${row.danger ? 'is-danger' : ''}" ${attrs.join(' ')}>
        <span>
          <strong>${C.escape(row.label)}</strong>
          <small>${C.escape(row.desc)}</small>
        </span>
        ${row.action === 'toggle' ? `<span class="toggle ${row.on ? 'is-on' : ''}" aria-hidden="true"></span>` : `<img class="account-card-arrow" src="${assetBase}icon-setting-cards-arrow.svg" alt="" loading="lazy" />`}
      </button>
    `;
  }

  function settingsGroup(group) {
    return `
      <section class="account-settings-card">
        ${sectionTitle(group.title, group.desc)}
        <div class="account-settings-list">
          ${group.rows.map(settingsRow).join('')}
        </div>
      </section>
    `;
  }

  function settings() {
    return C.shell({
      title: '환경설정',
      back: 'myPage',
      className: 'account-screen account-settings-screen',
      content: settingsGroups.map(settingsGroup).join(''),
    });
  }

  function settingsLegal(kind) {
    const doc = settingsLegalDocs[kind];
    return C.shell({
      title: doc.title,
      back: 'settings',
      className: `account-screen account-legal-screen account-legal-screen--${kind}`,
      content: `
        <h2 class="account-legal-heading">${C.escape(doc.heading)}</h2>
        <article class="account-legal-card">
          ${doc.sections
            .map(
              ([heading, body]) => `
                <section>
                  <h3>${C.escape(heading)}</h3>
                  <p>${C.escape(body).replace(/\n/g, '<br />')}</p>
                </section>
              `,
            )
            .join('')}
        </article>
        <div class="fixed-bottom-action">${C.button('돌아가기', { route: 'settings' })}</div>
      `,
    });
  }

  function inquiryDone() {
    return `
      <section class="account-complete-state">
        <span class="account-complete-state__mark" aria-hidden="true">
          <svg width="47" height="47" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.0833 45.1667C29.1814 45.1667 34.7023 42.6949 38.6986 38.6986C42.6949 34.7023 45.1667 29.1814 45.1667 23.0833C45.1667 16.9852 42.6949 11.4644 38.6986 7.46805C34.7023 3.47176 29.1814 1 23.0833 1C16.9852 1 11.4644 3.47176 7.46805 7.46805C3.47176 11.4644 1 16.9852 1 23.0833C1 29.1814 3.47176 34.7023 7.46805 38.6986C11.4644 42.6949 16.9852 45.1667 23.0833 45.1667Z" fill="#FEF4D2" stroke="#EF9F27" stroke-width="2" stroke-linejoin="round"/>
            <path d="M14.25 23.0833L20.875 29.7083L34.125 16.4583" stroke="#EF9F27" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
        <h2>문의 등록이 완료되었습니다!</h2>
        <p>문의 확인 후 이메일로 답변드릴게요.</p>
      </section>
      <div class="fixed-bottom-action">${C.button('환경 설정으로 돌아가기', { route: 'settings' })}</div>
    `;
  }

  function inquiryForm() {
    return `
      <form class="account-form-card account-inquiry-form">
        <label class="field-label" for="inquiry-email">답변 받으실 이메일</label>
        <input id="inquiry-email" class="input account-input" placeholder="email@example.com" />
        <label class="field-label" for="inquiry-message">문의 내용</label>
        <textarea id="inquiry-message" class="textarea account-textarea" placeholder="내용을 입력하세요"></textarea>
      </form>
      <div class="fixed-bottom-action">${C.button('문의하기', { route: 'inquiryDone' })}</div>
    `;
  }

  function inquiry(done = false) {
    return C.shell({
      title: '이용문의',
      back: 'settings',
      className: `account-screen account-inquiry-screen ${done ? 'is-done account-inquiry-done-screen' : ''}`,
      content: done ? inquiryDone() : inquiryForm(),
    });
  }

  function withdraw() {
    return C.shell({
      title: '회원 탈퇴',
      back: 'settings',
      className: 'account-screen account-withdraw-screen',
      content: `
        <section class="account-withdraw-hero">
          <div>
            <h1><strong>${C.escape(D.user.name)}님</strong><span>정말로 탈퇴하시겠어요?</span></h1>
          </div>
          <img class="account-withdraw-hero__asset" src="${assetBase}character-withdraw-sad.svg" alt="" loading="lazy" />
        </section>
        <section class="account-warning-card">
          <strong><img src="${assetBase}icon-withdraw-warning.svg" alt="" loading="lazy" />꼭 확인해주세요!</strong>
          <ul>
            <li>지금 탈퇴하시면 지금까지 모은 쿠키와 상품권이 함께 사라져요. 추후에 동일 계정으로 재가입하셔도 쿠키와 상품권내역은 복구되지 않아요!</li>
            <li>탈퇴 후에는 작성하신 퀴즈를 수정 혹은 삭제하실 수 없습니다! 탈퇴 신청 전에 꼭 확인해 주세요! 관련한 댓글, 퀴즈 기록 모두 사라집니다!</li>
          </ul>
        </section>
        <button class="account-check-row check-row" data-action="check">
          <span class="account-check-row__label"><span class="check-mark" aria-hidden="true"></span> 회원 탈퇴 유의사항을 확인했으며 동의합니다</span>
        </button>
        <section class="account-form-card account-withdraw-form">
          <label class="field-label" for="withdraw-reason">떠나시는 이유를 알려주세요!</label>
          <textarea id="withdraw-reason" class="textarea account-textarea" placeholder="서비스 탈퇴 사유에 대해 알려주세요.&#10;고객님의 소중한 피드백을 담아&#10;더 좋은 서비스로 보답 드리도록 하겠습니다!"></textarea>
        </section>
        <div class="fixed-bottom-action">${C.button('회원 탈퇴', { route: 'onboarding1', variant: 'orange', disabled: true })}</div>
      `,
    });
  }

  function cookieTabBar(type) {
    const tabs = [
      { id: 'all', label: '전체', route: 'cookieHistory' },
      { id: 'earn', label: '적립', route: 'cookieHistoryEarn' },
      { id: 'use', label: '사용', route: 'cookieHistoryUse' },
    ];

    return `
      <div class="tabs account-tabs account-cookie-tabs">
        ${tabs
          .map(
            (tab) => `
              <button class="tab ${type === tab.id ? 'is-active' : ''}" data-route="${C.escape(tab.route)}">
                ${C.escape(tab.label)}
              </button>
            `
          )
          .join('')}
      </div>
    `;
  }

  function cookieSummary() {
    return `
      <section class="account-cookie-ledger">
        <div class="account-cookie-ledger__balance">
          <article class="account-cookie-ledger__metric">
            <span>보유 쿠키</span>
            <strong class="account-cookie-ledger__owned"><b>${C.escape(D.user.cookie)}</b><em>개</em></strong>
          </article>
          <article class="account-cookie-ledger__metric">
            <span>교환 가능 금액</span>
            <strong class="account-cookie-ledger__money"><b>8,000</b><em>원</em></strong>
          </article>
          <img class="account-cookie-ledger__hero" src="${assetBase}cookie-history-top-cookie.svg" alt="" loading="lazy" />
        </div>
        <div class="account-cookie-ledger__stats">
          <article>
            <span>누적 획득</span>
            <strong>1,240</strong>
          </article>
          <article>
            <span>누적 사용</span>
            <strong>1,160</strong>
          </article>
        </div>
      </section>
    `;
  }

  function cookieHistoryRow(row) {
    return `
      <article class="account-cookie-row is-${C.escape(row.kind)}">
        <span class="account-cookie-row__icon" aria-hidden="true"><img src="${assetBase}${C.escape(row.icon)}" alt="" loading="lazy" /></span>
        <div>
          <strong>${C.escape(row.title)}</strong>
          <p>${C.escape(row.subtitle)}</p>
        </div>
        <span class="account-cookie-row__right">
          <strong>${C.escape(row.amount)}</strong>
          <time>${C.escape(row.time)}</time>
        </span>
      </article>
    `;
  }

  function cookieHistory(type = 'all') {
    const rows = cookieRows.filter((row) => type === 'all' || row.kind === type);
    const grouped = rows.reduce((acc, row) => {
      if (!acc[row.dateLabel]) acc[row.dateLabel] = [];
      acc[row.dateLabel].push(row);
      return acc;
    }, {});

    return C.shell({
      title: '쿠키 내역 관리',
      back: 'myPage',
      className: 'account-screen account-cookie-history-screen',
      content: `
        ${cookieSummary()}
        ${cookieTabBar(type)}
        <div class="account-cookie-list">
          ${Object.entries(grouped)
            .map(
              ([date, items]) => `
                <section class="account-cookie-date-group">
                  <h2>${C.escape(date)}</h2>
                  ${items.map(cookieHistoryRow).join('')}
                </section>
              `
            )
            .join('')}
        </div>
      `,
    });
  }

  window.StoritScreenRegistry.register({
    myPage,
    notifications: () => notifications('news'),
    notificationsDone: () => notifications('done'),
    notificationsNotice: () => notifications('notice'),
    noticeWelcome: () => noticeDetail('noticeWelcome'),
    noticeMaintenance: () => noticeDetail('noticeMaintenance'),
    settings,
    settingsTermService: () => settingsLegal('service'),
    settingsTermPrivacy: () => settingsLegal('privacy'),
    settingsTerms: () => settingsLegal('service'),
    settingsPrivacy: () => settingsLegal('privacy'),
    inquiry: () => inquiry(false),
    inquiryDone: () => inquiry(true),
    withdraw,
    cookieHistory: () => cookieHistory('all'),
    cookieHistoryEarn: () => cookieHistory('earn'),
    cookieHistoryUse: () => cookieHistory('use'),
  });
})();
