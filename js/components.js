(function () {
  const navItems = [
    { id: "home", label: "홈", icon: "home" },
    { id: "rankingDaily", route: "rankingOnboarding", label: "랭킹", icon: "ranking" },
    { id: "shop", label: "상점", icon: "shop" },
    { id: "myPage", label: "마이페이지", icon: "mypage" },
  ];

  function escape(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function imageFor(type, label) {
    const images = window.StoritData?.assetImages || {};
    const groups = {
      character: "characters",
      icon: "icons",
      product: "products",
      poster: "posters",
      logo: "logos",
    };
    const group = images[groups[type]];
    if (!group) return "";

    if (type === "character") {
      const key = String(label);
      if (key === "ranking") return group.ranking;
      if (key === "score") return group.score;
      if (key === "avatar") return group.avatar;
      if (key === "newspaper") return group.newspaper;
      if (key === "sad") return group.sad;
      if (key === "shop") return group.shop;
      if (key === "heroChef") return group.heroChef;
      if (key === "recipeChef") return group.recipeChef;
      if (key === "chefOven") return group.chefOven;
      if (key === "chefTable") return group.chefTable;
      if (key === "basket") return group.basket;
      if (key === "tray") return group.tray;
      if (key === "vaultEmpty") return group.vaultEmpty;
      if (key === "shopBack") return group.shopBack;
      if (key === "chef") return group.default;
      return group.default;
    }

    return group[label] || "";
  }

  function iconPath(key) {
    const icons = window.StoritData?.assetImages?.icons || {};
    return icons[key] || "";
  }

  function iconSvg(key, extraClass = "") {
    const normalized = String(key || "").trim();
    const image = iconPath(normalized);
    if (image) {
      return `<span class="icon-symbol ${extraClass}" aria-hidden="true"><img src="${escape(image)}" alt="" loading="lazy" /></span>`;
    }

    const strokeIcon = (body) => `
      <span class="icon-symbol ${extraClass}" aria-hidden="true">
        <svg viewBox="0 0 48 48" focusable="false">${body}</svg>
      </span>
    `;
    const fill = "currentColor";
    const stroke = "currentColor";
    const attrs = `fill="none" stroke="${stroke}" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"`;
    const map = {
      home: `<path ${attrs} d="M8 23 24 10l16 13v16a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V23Z"/><path ${attrs} d="M19 41V28h10v13"/>`,
      ranking: `<path ${attrs} d="M12 18h24v23H12z"/><path ${attrs} d="M18 18v-5h12v5"/><path ${attrs} d="M10 25H6v11h6M38 25h4v11h-4"/><path fill="${fill}" d="M24 26.5 26.3 31l5 .7-3.7 3.5.9 5-4.5-2.3-4.5 2.3.9-5-3.7-3.5 5-.7z"/>`,
      shop: `<path ${attrs} d="M10 19h28l-3 22H13L10 19Z"/><path ${attrs} d="M17 19a7 7 0 0 1 14 0"/><path ${attrs} d="M15 29h18"/>`,
      mypage: `<circle ${attrs} cx="24" cy="17" r="7"/><path ${attrs} d="M11 39c2-8 8-12 13-12s11 4 13 12"/>`,
      mission: `<path fill="#ff9f16" d="M28.5 8.5 23.8 20l-11.4 4.4 11.4 4.4 4.7 11.5 4.7-11.5 11.4-4.4-11.4-4.4z"/><circle fill="#fff4cf" cx="24" cy="24" r="8.3"/><circle fill="#ff9f16" cx="24" cy="24" r="4.2"/><path fill="#ff9f16" d="M11 6.5c4.5 2 7 4.9 8.2 9.1l-4.7 1.4c-.8-2.7-2.4-4.6-5.4-5.9z"/>`,
      attendance: `<rect x="10" y="12" width="28" height="28" rx="5" fill="#ffd457"/><rect x="13" y="18" width="22" height="19" rx="3" fill="#fff6d8"/><path fill="#ff9f16" d="M15 8h4v8h-4zM29 8h4v8h-4z"/><path fill="none" stroke="#ff9f16" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" d="m17 28 5 5 10-12"/>`,
      invite: `<ellipse fill="#d18b00" cx="20" cy="27" rx="11" ry="8"/><ellipse fill="#ffcf4d" cx="29" cy="20" rx="10" ry="8"/><circle fill="#8a4d00" cx="26" cy="20" r="2"/><circle fill="#8a4d00" cx="32" cy="20" r="2"/><path fill="#ffcf4d" d="m18 33-6 5 1.4-7z"/><path fill="#d18b00" d="m33 25 6 5-7.8-1.5z"/>`,
      myQuiz: `<path fill="#ffd457" d="M15 7h18a4 4 0 0 1 4 4v29H11V11a4 4 0 0 1 4-4Z"/><path fill="#fff8de" d="M15 12h18v23H15z"/><path fill="#f05f43" d="M36 7 41 12 24 29l-6 1.5 1.5-6z"/><path fill="#4b2a04" d="M18 18h10v3H18zm0 8h8v3h-8z"/>`,
      trophy: `<path ${attrs} d="M15 10h18v8c0 7-4 12-9 12s-9-5-9-12v-8Z"/><path ${attrs} d="M15 14H8c0 8 3 12 9 13M33 14h7c0 8-3 12-9 13M20 38h8M17 42h14"/>`,
      megaphone: `<path ${attrs} d="M9 27h8l20 8V13l-20 8H9v6Z"/><path ${attrs} d="M17 27l4 12h5l-3-10"/>`,
      clipboard: `<rect ${attrs} x="12" y="11" width="24" height="29" rx="4"/><path ${attrs} d="M19 13c0-3 2-5 5-5s5 2 5 5v2H19v-2ZM18 27l4 4 8-9"/>`,
      reject: `<rect ${attrs} x="12" y="11" width="24" height="29" rx="4"/><path ${attrs} d="M19 13c0-3 2-5 5-5s5 2 5 5v2H19v-2ZM19 25l10 10M29 25 19 35"/>`,
      gift: `<rect ${attrs} x="9" y="20" width="30" height="20" rx="3"/><path ${attrs} d="M24 20v20M9 28h30"/><path ${attrs} d="M24 19c-8-5-11-9-8-12 4-4 8 3 8 12Zm0 0c8-5 11-9 8-12-4-4-8 3-8 12Z"/>`,
      ticket: `<path ${attrs} d="M9 17h30v6a5 5 0 0 0 0 10v6H9v-6a5 5 0 0 0 0-10v-6Z"/><path ${attrs} d="M21 18v20M27 23h5M27 32h5"/>`,
      store: `<path ${attrs} d="M11 18h26l-3-8H14l-3 8Z"/><path ${attrs} d="M13 18v22h22V18M19 40V29h10v11"/><path ${attrs} d="M9 18c0 4 3 6 6 6s5-2 5-6c0 4 3 6 5 6s5-2 5-6c0 4 2 6 5 6s5-2 5-6"/>`,
      cafe: `<path ${attrs} d="M12 17h21v12c0 6-4 10-10 10s-11-4-11-10V17Z"/><path ${attrs} d="M33 20h4a5 5 0 0 1 0 10h-4M15 10c3 2 3 4 0 6M24 9c3 2 3 4 0 6"/>`,
      food: `<path ${attrs} d="M16 9v31M11 10v12c0 4 2 6 5 6s5-2 5-6V10M33 9v31M33 9c-5 5-7 11-5 18h5"/>`,
      more: `<circle fill="${fill}" cx="15" cy="24" r="3.3"/><circle fill="${fill}" cx="24" cy="24" r="3.3"/><circle fill="${fill}" cx="33" cy="24" r="3.3"/>`,
      butter: `<path ${attrs} d="M11 24 25 14l12 5v14L23 42 11 36V24Z"/><path ${attrs} d="m11 24 12 5 14-10M23 29v13"/><path fill="${fill}" opacity=".16" d="M14 25.5 25 18l8 3.2-11 7.1z"/>`,
      flour: `<path ${attrs} d="M15 12h18l-3 28H18l-3-28Z"/><path ${attrs} d="M17 18h14M19 25h10"/><path ${attrs} d="M21 11c1-4 5-4 6 0"/><path fill="${fill}" opacity=".16" d="M19 20h10v15H19z"/>`,
      milk: `<path ${attrs} d="M17 14h14l-2 6v21H19V20l-2-6Z"/><path ${attrs} d="M19 8h10v6H19zM19 25h10"/><path fill="${fill}" opacity=".16" d="M20 26h8v11h-8z"/>`,
      sugar: `<path ${attrs} d="M16 12h16l-2 28H18l-2-28Z"/><path ${attrs} d="M19 17h10M18 24h12"/><path fill="${fill}" opacity=".16" d="M19 25h10v12H19z"/>`,
      chocolate: `<path ${attrs} d="M10 24c3-9 8-13 14-13s11 4 14 13v14H10V24Z"/><path ${attrs} d="M14 25c3 3 5 3 8 0s5-3 8 0 5 3 8 0"/><path fill="${fill}" opacity=".18" d="M13 29h22v6H13z"/>`,
      cookie: `<circle ${attrs} cx="24" cy="24" r="15"/><circle fill="${fill}" cx="18" cy="19" r="2.4"/><circle fill="${fill}" cx="28" cy="18" r="2.2"/><circle fill="${fill}" cx="29" cy="28" r="2.8"/><circle fill="${fill}" cx="19" cy="31" r="2.1"/>`,
      logout: `<path ${attrs} d="M21 10h-8v28h8"/><path ${attrs} d="M24 24h15M33 16l7 8-7 8"/>`,
      question: `<circle ${attrs} cx="24" cy="24" r="16"/><path ${attrs} d="M18.5 18.5c1.2-3.8 4.4-5.5 8-4.6 3.2.8 5 3.4 4.5 6.2-.4 2.4-2.2 3.8-4.5 5.2-2 1.3-2.5 2.2-2.5 4.4"/><circle fill="${fill}" cx="24" cy="36" r="2.4"/>`,
      check: `<path ${attrs} d="m12 24 8 8 17-18"/>`,
      clock: `<circle ${attrs} cx="24" cy="24" r="16"/><path ${attrs} d="M24 14v11l8 5"/>`,
      close: `<path ${attrs} d="M15 15 33 33M33 15 15 33"/>`,
    };
    return strokeIcon(map[normalized] || map.more);
  }

  function asset(type, label, extraClass = "") {
    const image = imageFor(type, label);
    if (type === "icon" && !image) {
      return `<div class="asset ${type} ${extraClass}" aria-hidden="true">${iconSvg(label)}</div>`;
    }
    const img = image ? `<img src="${escape(image)}" alt="" loading="lazy" />` : escape(label);
    return `<div class="asset ${type} ${extraClass}" aria-hidden="true">${img}</div>`;
  }

  function cookieIcon(extraClass = "") {
    return `<span class="cookie-icon ${extraClass}" aria-hidden="true"><i></i><i></i><i></i><i></i></span>`;
  }

  function logo(name = "storit", extraClass = "") {
    const src = window.StoritData?.assetImages?.logos?.[name];
    return src ? `<img class="brand-image ${extraClass}" src="${escape(src)}" alt="Storit" />` : `<div class="brand-logo">Storit</div>`;
  }

  function header(title, options = {}) {
    const backAttr = options.backModal
      ? `data-modal="${escape(options.backModal)}"`
      : options.back
        ? `data-back="${escape(options.back)}"`
        : "data-back";
    const right = options.right || "";
    return `
      <header class="app-header ${options.rounded === false ? "" : "is-rounded"}">
        ${options.noBack ? "<span></span>" : `<button class="icon-button" ${backAttr} aria-label="뒤로가기"><img class="icon-button__back" src="./assets/figma-exported/named/icon-back-arrow.svg" alt="" loading="lazy" /></button>`}
        <h1 class="app-title">${escape(title)}</h1>
        ${right || "<span></span>"}
      </header>
    `;
  }

  function bottomNav(active) {
    return `
      <nav class="bottom-nav" aria-label="주요 메뉴">
        ${navItems
          .map(
            (item) => `
              <button class="nav-item ${active === item.id ? "is-active" : ""}" data-route="${item.route || item.id}">
                <span class="nav-item__icon">${iconSvg(item.icon)}</span>
                <span>${item.label}</span>
              </button>
            `,
          )
          .join("")}
      </nav>
    `;
  }

  function shell({ title, content, activeNav, back, backModal, right, className = "", noBack = false }) {
    return `
      <section class="screen has-scallop ${activeNav ? "nav-safe" : ""} ${className}">
        ${header(title, { back, backModal, right, noBack })}
        <div class="screen-content">${content}</div>
        ${activeNav ? bottomNav(activeNav) : ""}
      </section>
    `;
  }

  function button(label, options = {}) {
    const classes = ["btn", options.variant || "", options.size || ""].filter(Boolean).join(" ");
    const attrs = [];
    if (options.route) attrs.push(`data-route="${escape(options.route)}"`);
    if (options.modal) attrs.push(`data-modal="${escape(options.modal)}"`);
    if (options.action) attrs.push(`data-action="${escape(options.action)}"`);
    if (options.disabled) attrs.push("disabled");
    return `<button class="${classes}" ${attrs.join(" ")}>${label}</button>`;
  }

  function pill(label, variant = "") {
    return `<span class="pill ${variant}">${label}</span>`;
  }

  function progress(value) {
    return `<div class="progress" aria-label="진행률"><span style="--value:${value}%"></span></div>`;
  }

  function ingredientTrack(items) {
    return `
      <div class="ingredient-track">
        ${items
          .map((item, index) => {
            const state = item.done ? "is-done" : index === items.findIndex((entry) => !entry.done) ? "is-current" : "is-locked";
            return `
              <div class="ingredient ${state}">
                ${asset("icon", item.icon)}
                <span>${escape(item.name)}</span>
              </div>
            `;
          })
          .join("")}
      </div>
    `;
  }

  function webtoonRow(item, index = 0) {
    return `
      <article class="webtoon-row">
        ${asset("poster", item.thumb || "WEB")}
        <div class="stack-sm">
          <h3>${escape(item.title)}</h3>
          <div>
            ${item.genre.map((tag) => `<span class="tag">${escape(tag)}</span>`).join(" ")}
          </div>
        </div>
        <button class="btn small ${index === 1 ? "dark" : ""}" data-route="${index === 1 ? "quizResultGood" : "quiz"}">${escape(item.action)}</button>
      </article>
    `;
  }

  function productCard(product) {
    return `
      <article class="product-card" data-route="productDetail">
        <div class="product-card__thumb">${asset("product", product.image || product.brand)}</div>
        <strong class="product-name">${escape(product.name)}</strong>
        <span class="cookie-price">${cookieIcon()} ${escape(product.price)}</span>
      </article>
    `;
  }

  function rewardRow(reward, used = false) {
    return `
      <article class="reward-row">
        ${asset("product", "N pay")}
        <div class="stack-sm">
          ${used ? "" : pill(reward.dday, "green")}
          <strong class="product-name">${escape(reward.name)}</strong>
          <span class="tiny">${cookieIcon("mini")} 50 쿠키 교환</span>
          <span class="tiny">⌛ ${escape(reward.date)}</span>
        </div>
        <button class="btn small ${used ? "soft" : "outline"}" data-route="${used ? "rewardUsed" : "rewardDetail"}">${used ? "사용완료" : "사용하기"}</button>
      </article>
    `;
  }

  function infoTable(rows) {
    return `
      <div class="info-table">
        ${rows
          .map(
            ([label, value]) => `
              <div class="tr">
                <span>${escape(label)}</span>
                <strong>${escape(value)}</strong>
              </div>
            `,
          )
          .join("")}
      </div>
    `;
  }

  function noticeItem(item) {
    return `
      <article class="notice-item">
        ${asset("icon", item[3])}
        <div>
          <strong>${escape(item[0])}</strong>
          <p class="tiny muted">${escape(item[1])}</p>
        </div>
        ${pill(item[2])}
      </article>
    `;
  }

  window.StoritComponents = {
    escape,
    icon: iconSvg,
    asset,
    cookieIcon,
    logo,
    header,
    bottomNav,
    shell,
    button,
    pill,
    progress,
    ingredientTrack,
    webtoonRow,
    productCard,
    rewardRow,
    infoTable,
    noticeItem,
  };
})();
