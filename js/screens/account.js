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
    { label: '인생 웹툰', value: '기자매', meta: '최근 수정 3일 전', modal: 'editLife' },
    { label: '좋아하는 장르', value: '공포, 스릴러', meta: '추천 퀴즈 반영 중', modal: 'editGenre' },
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
      { icon: 'megaphone', title: '새 공지사항이 등록되었어요!!', body: '스토릿에 오신 여러분을 환영합니다.', action: '확인하기', tone: 'notice', route: 'noticeWelcome', pinned: true },
      { icon: 'megaphone', title: '새 공지사항이 등록되었어요!!', body: '서비스 안정화를 위한 점검이 진행됩니...', action: '확인하기', tone: 'notice', route: 'noticeMaintenance' },
      { icon: 'megaphone', title: '새 공지사항이 등록되었어요!!', body: '상품권 관련 오류 개선사항입니다.', action: '확인하기', tone: 'notice', route: 'noticeMaintenance' },
      { icon: 'megaphone', title: '새 공지사항이 등록되었어요!!', body: '스토릿에 오신 여러분을 환영합니다.', action: '확인하기', tone: 'notice', route: 'noticeWelcome' },
    ],
  };

  const noticeDetails = {
    noticeWelcome: {
      title: '스토릿에 오신 여러분을 환영합니다.',
      prev: '서비스 안정화를 위한 점...',
      next: '서비스 안정화를 위한 점...',
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
      prev: '서비스 안정화를 위한 점...',
      next: '서비스 안정화를 위한 점...',
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
        { label: '퀴즈 알림', desc: '새 퀴즈와 심사 결과', action: 'toggle', on: false },
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
        { label: '이용약관', desc: '서비스 이용 기준', route: 'termService' },
        { label: '개인정보 처리방침', desc: '수집 및 이용 항목', route: 'termPrivacy' },
      ],
    },
  ];

  const cookieRows = [
    { title: '오늘의 미션 완료', amount: '+1', date: '2026.05.21 14:30', kind: 'earn', source: '미션' },
    { title: '퀴즈 결과 보상', amount: '+3', date: '2026.05.21 13:10', kind: 'earn', source: '퀴즈' },
    { title: '네이버페이 교환', amount: '-50', date: '2026.05.20 18:22', kind: 'use', source: '상점' },
    { title: '출석체크 보상', amount: '+1', date: '2026.05.20 09:12', kind: 'earn', source: '출석' },
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
            <button class="account-text-button" data-modal="editLife">수정</button>
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
    const completedIngredients = D.ingredients.map((item) => ({ ...item, done: true }));
    return C.shell({
      title: '마이페이지',
      back: 'home',
      activeNav: 'myPage',
      className: 'account-screen account-my-page account-my-page--final',
      right: `<button class="icon-button account-header-action account-header-gear" data-route="settings" aria-label="설정"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9.7 3.4 9.2 5.6a7.3 7.3 0 0 0-1.4.8L5.7 5.8 3.4 8.1l.7 2.1a7.6 7.6 0 0 0-.6 1.5l-2.1.6v3.3l2.1.6c.2.5.4 1 .7 1.5l-.8 2 2.3 2.4 2.1-.7c.4.3.9.6 1.4.8l.5 2.1h3.4l.5-2.1c.5-.2 1-.4 1.4-.8l2.1.7 2.3-2.4-.8-2c.3-.5.5-1 .7-1.5l2.1-.6v-3.3l-2.1-.6c-.1-.5-.4-1-.6-1.5l.7-2.1-2.3-2.3-2.1.6c-.4-.3-.9-.6-1.4-.8l-.5-2.2H9.7Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><circle cx="11.4" cy="13" r="3.4" fill="none" stroke="currentColor" stroke-width="1.8"/></svg></button>`,
      content: `
        <section class="account-final-profile" aria-label="프로필">
          <div class="account-final-profile__avatar">
            <img src="${assetBase}user-profile-cookie.svg" alt="" loading="lazy" />
          </div>
          <div class="account-final-profile__body">
            <div class="account-final-profile__name">
              <h2>${C.escape(D.user.name)}</h2>
              <button type="button" data-modal="editLife">프로필 수정 ›</button>
            </div>
            <div class="account-final-profile__level">
              <strong>LV. ${C.escape(D.user.level)}</strong>
              <div class="account-final-profile__bar"><span></span></div>
            </div>
            <p>다음 레벨까지 <strong>120 EXP ›</strong></p>
          </div>
        </section>

        <section class="account-final-card account-final-achievements">
          <h3>나의 업적</h3>
          <div class="account-final-achievements__grid">
            <article>
              <span class="account-achievement-visual is-crown"></span>
              <strong>최고 랭킹</strong>
              <em>10위</em>
            </article>
            <article>
              <span class="account-achievement-visual is-clover"></span>
              <strong>행운 횟수</strong>
              <em>7회</em>
            </article>
            <article>
              <span class="account-achievement-visual is-score"></span>
              <strong>최고 점수</strong>
              <em>98.8점</em>
            </article>
            <article>
              <span class="account-achievement-visual is-calendar"></span>
              <strong>연속 출석</strong>
              <em>15일</em>
            </article>
          </div>
        </section>

        <section class="account-final-card account-final-cookie" data-route="cookieHistory">
          <img class="account-final-cookie__asset" src="${assetBase}icon-quiz-writing-cookie.png" alt="" loading="lazy" />
          <strong class="account-final-cookie__title">쿠키 내역 관리</strong>
          <span class="account-final-cookie__caption">보유 쿠키</span>
          <div class="account-final-cookie__stats">
            <span><small>보유</small><strong>80</strong></span>
            <span><small>누적 획득</small><strong>1,240</strong></span>
            <span><small>누적 사용</small><strong>1,160</strong></span>
          </div>
          <i aria-hidden="true">›</i>
        </section>

        <div class="account-final-pref-grid">
          <section>
            <span>인생 웹툰</span>
            <strong>기자매</strong>
            <button type="button" data-modal="editLife">수정하기</button>
          </section>
          <section>
            <span>좋아하는 장르</span>
            <strong>공포, 스릴러</strong>
            <button type="button" data-modal="editGenre">수정하기</button>
          </section>
        </div>

        <div class="account-final-shortcut-grid">
          <section>
            <span><img src="${assetBase}icon-shop-category-gift.svg" alt="" loading="lazy" /> 내 보관함</span>
            <strong>사용 가능한<br />상품권 2개</strong>
            <button type="button" data-route="vault">보관함 가기 ›</button>
          </section>
          <section>
            <span><img src="${assetBase}icon-home-myquiz.svg" alt="" loading="lazy" /> 내 퀴즈</span>
            <strong>퀴즈 심사 결과<br />확인 1건</strong>
            <button type="button" data-route="myQuiz">내 퀴즈 가기 ›</button>
          </section>
        </div>

        <section class="account-final-card account-final-mission">
          <div>
            <h3>오늘의 쿠키 제작 진행상태</h3>
          </div>
          <button type="button" data-route="mission">미션 보러가기</button>
          ${C.ingredientTrack(completedIngredients)}
        </section>
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
    const icon = isNoticeCookie ? `<img class="account-notice-cookie-solid" src="${assetBase}icon-notice-cookie-paid.svg" alt="" loading="lazy" />` : item.asset ? C.asset(item.assetType || 'icon', item.asset) : C.icon(item.icon);
    return `
      <article class="account-notice-row is-${C.escape(item.tone)}" ${attrs}>
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
            <span aria-hidden="true">‹</span>
            <strong>이전글</strong>
            <small>${C.escape(notice.prev)}</small>
          </button>
          <button type="button" data-route="noticeWelcome">
            <strong>다음글</strong>
            <small>${C.escape(notice.next)}</small>
            <span aria-hidden="true">›</span>
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
        ${row.action === 'toggle' ? `<span class="toggle ${row.on ? 'is-on' : ''}" aria-hidden="true"></span>` : '<span class="account-card-arrow" aria-hidden="true">›</span>'}
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

  function inquiryDone() {
    return `
      <section class="account-complete-state">
        <span class="account-complete-state__mark">✓</span>
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
      className: `account-screen account-inquiry-screen ${done ? 'is-done' : ''}`,
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
          <strong>꼭 확인해주세요!</strong>
          <ul>
            <li>지금 탈퇴하시면 지금까지 모은 쿠키와 상품권이 함께 사라져요. 추후에 동일 계정으로 재가입하셔도 쿠키와 상품권내역은 복구되지 않아요!</li>
            <li>탈퇴 후에는 작성하신 퀴즈를 수정 혹은 삭제하실 수 없습니다! 탈퇴 신청 전에 꼭 확인해 주세요! 관련한 댓글, 퀴즈 기록 모두 사라집니다!</li>
          </ul>
        </section>
        <button class="account-check-row check-row" data-action="check">
          <span><span class="check-mark">✓</span> 회원 탈퇴 유의사항을 확인했으며 동의합니다</span>
        </button>
        <section class="account-form-card account-withdraw-form">
          <label class="field-label" for="withdraw-reason">떠나시는 이유를 알려주세요</label>
          <textarea id="withdraw-reason" class="textarea account-textarea" placeholder="서비스 탈퇴 사유에 대해 알려주세요.&#10;고객님의 소중한 피드백을 담아&#10;더 좋은 서비스로 보답 드리도록 하겠습니다!"></textarea>
        </section>
        <div class="fixed-bottom-action">${C.button('회원 탈퇴', { route: 'signup', variant: 'orange' })}</div>
      `,
    });
  }

  function cookieTabBar(type) {
    const tabs = [
      { id: 'all', label: '전체', route: 'cookieHistory' },
      { id: 'earn', label: '획득', route: 'cookieHistoryEarn' },
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
      <section class="account-card account-cookie-summary">
        ${C.asset('character', 'newspaper', 'account-cookie-summary__asset')}
        <div class="account-cookie-summary__body">
          <span class="account-eyebrow">쿠키 잔액</span>
          <strong>${C.escape(D.user.cookie)}개</strong>
          <p>상품 교환까지 20개 남았어요.</p>
        </div>
        <div class="account-cookie-summary__metrics">
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
        </div>
      </section>
    `;
  }

  function cookieHistoryRow(row) {
    return `
      <article class="account-cookie-row is-${C.escape(row.kind)}">
        <span class="account-cookie-row__icon" aria-hidden="true">${C.icon('cookie')}</span>
        <div>
          <span>${C.escape(row.source)}</span>
          <strong>${C.escape(row.title)}</strong>
          <time>${C.escape(row.date)}</time>
        </div>
        <strong>${C.escape(row.amount)}개</strong>
      </article>
    `;
  }

  function cookieHistory(type = 'all') {
    const rows = cookieRows.filter((row) => type === 'all' || row.kind === type);

    return C.shell({
      title: '쿠키 내역',
      back: 'myPage',
      className: 'account-screen account-cookie-history-screen',
      content: `
        ${cookieTabBar(type)}
        ${cookieSummary()}
        <div class="account-list-heading">
          <strong>${type === 'all' ? '전체 내역' : type === 'earn' ? '획득 내역' : '사용 내역'}</strong>
          <span>${rows.length}건</span>
        </div>
        <div class="account-cookie-list">
          ${rows.map(cookieHistoryRow).join('')}
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
    inquiry: () => inquiry(false),
    inquiryDone: () => inquiry(true),
    withdraw,
    cookieHistory: () => cookieHistory('all'),
    cookieHistoryEarn: () => cookieHistory('earn'),
    cookieHistoryUse: () => cookieHistory('use'),
  });
})();
