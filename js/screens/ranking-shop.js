(function () {
  const D = window.StoritData;
  const C = window.StoritComponents;
  const assetBase = "./assets/figma-exported/named/";

  function ensureStyles() {
    if (typeof document === "undefined") return;
    const doc = document;
    if (!doc.querySelector || !doc.createElement || !doc.head) return;
    if (doc.querySelector('link[href^="./css/ranking-shop.css"], link[data-storit-css="ranking-shop"]')) return;

    const link = doc.createElement("link");
    link.rel = "stylesheet";
    link.href = "./css/ranking-shop.css?v=scallop-layout-20260616a";
    if (link.setAttribute) {
      link.setAttribute("data-storit-css", "ranking-shop");
    }
    doc.head.appendChild(link);
  }

  ensureStyles();

  function escape(value) {
    return C.escape(value);
  }

  function namedAsset(file, alt, className = "") {
    return `<img class="${escape(className)}" src="${assetBase}${escape(file)}" alt="${escape(alt)}" loading="lazy" />`;
  }

  function initials(name) {
    return escape(String(name || "S").trim().slice(0, 1) || "S");
  }

  function scoreText(score, unit = "점") {
    const text = String(score);
    return text.includes("점") || text.includes("★") ? text : `${text}${unit}`;
  }

  function trendClass(trend) {
    const text = String(trend || "");
    if (text.includes("▲")) return "is-up";
    if (text.includes("▼")) return "is-down";
    return "is-flat";
  }

  function rankingTabs(active) {
    return `
      <div class="rs-tabs" aria-label="랭킹 전환">
        <button class="rs-tab ${active === "daily" ? "is-active" : ""}" data-route="rankingDaily">일간 랭킹</button>
        <button class="rs-tab ${active === "season" ? "is-active" : ""}" data-route="rankingSeason">시즌 랭킹</button>
      </div>
    `;
  }

  function statCard({ icon, label, value, note, tone = "" }) {
    return `
      <article class="rs-stat ${tone}">
        <span class="rs-stat__icon" aria-hidden="true">${C.icon(icon)}</span>
        <span>${escape(label)}</span>
        <strong>${value}</strong>
        ${note ? `<small>${escape(note)}</small>` : ""}
      </article>
    `;
  }

  function rankRow({ rank, name, score, trend, isMe = false, crown = false }) {
    return `
      <article class="rs-rank-row ${isMe ? "is-me" : ""} ${crown ? "is-crown" : ""}">
        <strong class="rs-rank-row__rank">${escape(rank)}</strong>
        <span class="rs-avatar" aria-hidden="true">${initials(name)}</span>
        <span class="rs-rank-row__user">
          <strong>${escape(name)}</strong>
          <small>${isMe ? "내 순위" : crown ? "현재 1위" : "참여자"}</small>
        </span>
        <strong class="rs-rank-row__score">${escape(score)}</strong>
        <span class="rs-rank-row__trend ${trendClass(trend)}">${escape(trend || "-")}</span>
      </article>
    `;
  }

  function rankingCompactRow({ rank, name, score, trend = "-", isMe = false, medal = false }) {
    return `
      <article class="rs-ranking-compact-row ${isMe ? "is-me" : ""} ${medal ? "is-medal" : ""}">
        <strong class="rs-ranking-compact-row__rank">${escape(rank)}</strong>
        <span class="rs-avatar" aria-hidden="true">${initials(name)}</span>
        <span class="rs-ranking-compact-row__name">${escape(name)}</span>
        <strong class="rs-ranking-compact-row__score">${scoreText(score)}</strong>
        <span class="rs-ranking-compact-row__trend ${trendClass(trend)}">${escape(trend)}</span>
      </article>
    `;
  }

  function productImage(product, className = "rs-product-card__image") {
    const imageKey = product.image || product.brand;
    const fileByKey = {
      npay: "product-npay.png",
      "N pay": "product-npay.png",
      googlePlay: "product-google-play.png",
      "Google Play": "product-google-play.png",
      ipad: "product-ipad.png",
    };
    return namedAsset(fileByKey[imageKey] || "product-npay.png", product.name, className);
  }

  function shopCatalog() {
    return [
      { ...D.products[0], badge: "실시간 인기", meta: "네이버페이", cta: "교환" },
      { ...D.products[1], badge: "게임 인기", meta: "Google Play", cta: "교환" },
      { name: "아이패드 이벤트 응모권", brand: "Event", price: 120, type: "event", image: "ipad", badge: "추첨", meta: "스페셜", cta: "응모" },
      { ...D.products[3], badge: "생활", meta: "편의점", cta: "교환" },
      { name: "네이버페이 포인트 10,000원", brand: "N pay", price: 100, type: "gift", image: "npay", badge: "고액권", meta: "상품권", cta: "교환" },
      { name: "구글 플레이 기프트 카드 10,000원", brand: "Google Play", price: 100, type: "card", image: "googlePlay", badge: "인기", meta: "디지털 코드", cta: "교환" },
    ];
  }

  function productCard(product, compact = false) {
    return `
      <article class="rs-product-card ${compact ? "is-compact" : ""}" data-route="productDetail">
        <div class="rs-product-card__media">
          ${productImage(product)}
          <span class="rs-product-card__badge">${escape(product.badge || product.type || "상품")}</span>
        </div>
        <div class="rs-product-card__body">
          <small>${escape(product.meta || product.brand)}</small>
          <strong>${escape(product.name)}</strong>
          <div class="rs-product-card__footer">
            <span>쿠키 ${escape(product.price)}개</span>
            <button class="rs-mini-button" data-route="productDetail">${escape(product.cta || "보기")}</button>
          </div>
        </div>
      </article>
    `;
  }

  function shopRecommendCard(product, index) {
    return `
      <article class="rs-shop-recommend-card" data-route="productDetail">
        ${productImage(product, "rs-shop-recommend-card__image")}
        <small>${escape(product.meta || product.brand)}</small>
        <strong>${escape(product.name)}</strong>
        <span>${C.icon("cookie")} ${escape(product.price)}개</span>
        ${index === 2 ? `<button class="rs-shop-next-button" type="button" aria-label="다음 추천상품">›</button>` : ""}
      </article>
    `;
  }

  function shopGridCard(product) {
    const normalizedName = String(product.name || "");
    const shortName = normalizedName.includes("포인트")
      ? normalizedName.replace("네이버페이 포인트 ", "")
      : normalizedName;
    return `
      <article class="rs-shop-grid-card" data-route="productDetail">
        ${productImage(product, "rs-shop-grid-card__image")}
        <small>${escape(product.meta || product.brand)}</small>
        <strong>${escape(shortName)}</strong>
        <span>${C.icon("cookie")} ${escape(product.price)}</span>
      </article>
    `;
  }

  function detailInfoCards() {
    return `
      <div class="rs-info-grid">
        ${statCard({ icon: "store", label: "사용처", value: "네이버페이", note: "가맹점" })}
        ${statCard({ icon: "clock", label: "지급", value: "1~3일", note: "앱 알림" })}
        ${statCard({ icon: "attendance", label: "유효", value: "30일", note: "발급일 기준" })}
      </div>
    `;
  }

  function exchangeSummary() {
    return `
      <article class="rs-exchange-summary">
        <div class="rs-exchange-summary__image">${namedAsset("product-npay.png", "네이버페이 포인트 5,000P")}</div>
        <div>
          <h2>네이버페이 포인트 5000P</h2>
          <strong>${C.icon("cookie")} 50 <span>쿠키</span></strong>
        </div>
      </article>
    `;
  }

  function exchangeCookieBalance() {
    return `
      <section class="rs-exchange-balance" aria-label="교환 쿠키 정보">
        <div>
          <span>내 보유 쿠키</span>
          <strong>${C.icon("cookie")} ${D.user.cookie}<small>개</small></strong>
        </div>
        <div>
          <span>교환 후 잔여 쿠키</span>
          <strong>${C.icon("cookie")} ${D.user.cookie - 50}<small>개</small></strong>
        </div>
      </section>
    `;
  }

  function exchangeGuide() {
    const items = [
      ["clock", "교환 신청 후 평균 1~3일 내 지급됩니다.", "평균 소요 기간이며, 상황에 따라 변동될 수 있어요."],
      ["question", "지급 완료시 앱 알림을 보내드려요.", "보상함에서 상품을 확인할 수 있어요."],
      ["gift", "마이페이지 > 보관함", "교환 상황은 보관함에서 확인 가능해요."],
    ];
    return `
      <section class="rs-exchange-guide">
        <h3>교환 안내</h3>
        <div class="rs-exchange-guide__card">
          ${items
            .map(
              ([icon, title, desc]) => `
                <article>
                  <span>${C.icon(icon)}</span>
                  <div>
                    <strong>${escape(title)}</strong>
                    <small>${escape(desc)}</small>
                  </div>
                </article>
              `,
            )
            .join("")}
        </div>
      </section>
    `;
  }

  function rewardCard(reward, used = false, index = 0) {
    return `
      <article class="rs-reward-card ${used ? "is-used" : ""}">
        <div class="rs-reward-card__media">${namedAsset("product-npay.png", reward.name)}</div>
        <div class="rs-reward-card__body">
          <div>
            ${used ? "" : `<span class="rs-chip is-green">${escape(reward.dday)}</span>`}
          </div>
          <strong>${escape(reward.name)}</strong>
          <small>${C.icon("cookie")} 50 쿠키 교환</small>
          <small>${C.icon("gift")} ${escape(reward.date)}</small>
        </div>
        <button class="rs-reward-card__button" data-route="${used ? "rewardUsed" : "rewardDetail"}">${used ? "사용완료" : "사용하기"}</button>
      </article>
    `;
  }

  function barcodeCard(copied = false) {
    return `
      <section class="rs-barcode-card ${copied ? "is-copied" : ""}">
        <div class="rs-barcode-card__header">
          <span>
            <small>바코드 번호</small>
            <strong>1234 5678 9101 1112</strong>
          </span>
          <span class="rs-chip ${copied ? "is-green" : "is-soft"}">${copied ? "복사 완료" : "사용 가능"}</span>
        </div>
        <div class="rs-barcode" aria-label="1234 5678 9101 1112"></div>
        ${
          copied
            ? `<button class="rs-copy-button is-copied" disabled>번호가 복사되었습니다</button>`
            : `<button class="rs-copy-button" data-route="rewardCopied">바코드 번호 복사</button>`
        }
      </section>
    `;
  }

  function rankingDaily() {
    const leaders = D.ranking.slice(0, 3);
    const tableRows = [
      ...leaders.map((row, index) => ({ rank: index + 1, name: row[0], score: row[1], trend: row[2], medal: true })),
      { rank: "···", name: "", score: "", trend: "", separator: true },
      { rank: 7, name: D.user.name, score: "790점", trend: "-", isMe: true },
      { rank: 8, name: "올라타도999", score: "810점", trend: "-" },
      { rank: 9, name: "은빛웨999", score: "810점", trend: "-" },
    ];

    return C.shell({
      title: "일간 랭킹",
      back: "home",
      activeNav: "rankingDaily",
      className: "ranking-shop-screen ranking-daily-screen",
      content: `
        ${rankingTabs("daily")}

        <section class="rs-ranking-summary">
          <div class="rs-ranking-summary__top">
            <div>
              <span class="rs-ranking-avatar">${C.asset("character", "avatar")}</span>
              <span>
                <strong>${escape(D.user.name)}</strong>
                <small>내 점수 ${escape(D.user.score)}점</small>
              </span>
            </div>
            <button type="button" data-route="quiz">점수 올리기</button>
          </div>

          <p class="rs-ranking-live"><b>LIVE</b> 일간 랭킹은 오늘 본 웹툰 퀴즈의 총점의 합으로 경쟁합니다.</p>

          <div class="rs-ranking-benefit-card">
            <div class="rs-ranking-benefits">
              <article><span class="rs-ranking-benefit-icon">${C.icon("trophy")}</span><strong>1등</strong><small>쿠키 50</small></article>
              <article><span class="rs-ranking-benefit-icon is-lucky">${C.icon("cookieWings")}</span><strong>행운의 당첨</strong><small>쿠키 20</small></article>
              <article><span class="rs-ranking-benefit-icon is-top">${C.icon("ranking")}</span><strong>TOP 30</strong><small>쿠키 1</small></article>
            </div>
            <div class="rs-ranking-benefit-card__art">${namedAsset("character-ranking.png", "랭킹 캐릭터")}</div>
          </div>

          <div class="rs-ranking-timer">자정까지 남은 시간 <strong>03:41:29</strong></div>
        </section>

        <section class="rs-ranking-my-strip">
          <span>${C.asset("character", "avatar")}</span>
          <div>
            <strong>내 순위 7위</strong>
            <small>내 점수 ${escape(D.user.score)}점</small>
          </div>
          <div>
            <strong>TOP 30 진입까지</strong>
            <small>+42점 필요</small>
          </div>
          <button type="button" data-route="quiz">퀴즈<br />풀기</button>
        </section>

        <section class="rs-ranking-table-card">
          <header>
            <strong>일간 랭킹</strong>
            <button type="button" data-route="rankingSeason">시즌 랭킹</button>
          </header>
          <div class="rs-ranking-table-head">
            <span>순위</span><span>닉네임</span><span>오늘 점수</span><span>순위변동</span>
          </div>
          <div class="rs-ranking-compact-list">
            ${tableRows
              .map((row) =>
                row.separator
                  ? `<div class="rs-ranking-separator">···</div>`
                  : rankingCompactRow(row),
              )
              .join("")}
          </div>
        </section>

        <section class="rs-lucky-card">
          <span class="rs-lucky-card__icon" aria-hidden="true">${C.icon("cookieWings")}</span>
          <div>
            <strong>오늘의 행운 구간은 10위~30위</strong>
            <p>순위가 높지 않아도 추첨 보상이 열려 있어요.</p>
          </div>
        </section>
      `,
    });
  }

  function rankingSeason() {
    const podium = D.ranking.slice(0, 3);
    const seasonRows = D.ranking.slice(3, 10);

    return C.shell({
      title: "시즌 랭킹",
      back: "rankingDaily",
      className: "ranking-shop-screen ranking-season-screen",
      content: `
        <section class="rs-hero rs-hero--season">
          <div class="rs-hero__copy">
            <span class="rs-kicker">SEASON 04</span>
            <h2>이번 달 누적 점수로<br />시즌 TOP에<br />도전하세요</h2>
            <p>시즌 종료까지 <strong>5일 03:41:29</strong> 남았어요.</p>
          </div>
          <div class="rs-hero__art">${namedAsset("character-ranking.png", "시즌 랭킹 캐릭터")}</div>
        </section>

        <div class="rs-stat-grid rs-stat-grid--season">
          ${statCard({ icon: "trophy", label: "내 시즌 순위", value: "12위", note: "상위 18%", tone: "is-gold" })}
          ${statCard({ icon: "ranking", label: "누적 점수", value: "22,680점", note: "이번 달", tone: "is-blue" })}
          ${statCard({ icon: "gift", label: "예상 보상", value: "쿠키 120개", note: "시즌 마감 후", tone: "is-green" })}
        </div>

        ${rankingTabs("season")}

        <section class="rs-panel rs-podium-panel">
          <div class="rs-panel__header">
            <div>
              <span class="rs-kicker">PODIUM</span>
              <h3>시즌 TOP 3</h3>
            </div>
            <span class="rs-chip is-soft">월간 누적</span>
          </div>
          <div class="rs-podium">
            <article class="rs-podium__slot is-second">
              <span class="rs-medal">2</span>
              <span class="rs-avatar">${initials(podium[1]?.[0])}</span>
              <strong>${escape(podium[1]?.[0] || "프로페서")}</strong>
              <small>★ ${escape(podium[1]?.[1] || "0")}</small>
            </article>
            <article class="rs-podium__slot is-first">
              <span class="rs-medal">1</span>
              <span class="rs-avatar">${initials(podium[0]?.[0])}</span>
              <strong>${escape(podium[0]?.[0] || "프로페서")}</strong>
              <small>★ ${escape(podium[0]?.[1] || "0")}</small>
            </article>
            <article class="rs-podium__slot is-third">
              <span class="rs-medal">3</span>
              <span class="rs-avatar">${initials(podium[2]?.[0])}</span>
              <strong>${escape(podium[2]?.[0] || "프로페서")}</strong>
              <small>★ ${escape(podium[2]?.[1] || "0")}</small>
            </article>
          </div>
        </section>

        <section class="rs-panel">
          <div class="rs-panel__header">
            <div>
              <span class="rs-kicker">SEASON TABLE</span>
              <h3>4위부터 보기</h3>
            </div>
            <button class="rs-text-button" data-route="rankingDaily">일간 보기</button>
          </div>
          <div class="rs-rank-list">
            ${seasonRows
              .map((row, index) =>
                rankRow({
                  rank: index + 4,
                  name: index === 1 ? D.user.name : row[0],
                  score: `★ ${escape(row[1]).replace("점", "")}`,
                  trend: row[2],
                  isMe: index === 1,
                }),
              )
              .join("")}
          </div>
        </section>
      `,
    });
  }

  function rankingYesterday() {
    return `
      <section class="screen success-scene">
        <div class="screen-content" style="text-align:center;padding-top:96px">
          <h1 style="font-size:30px;line-height:1.25;font-weight:1000">어제의 일간순위를<br />발표합니다!</h1>
          <div class="grid-2" style="margin:46px 38px 28px">
            <div class="card pad" style="background:var(--color-primary)">1위<br />프로페서제진<br />★ 9,990<br />쿠키 50</div>
            <div class="card pad" style="background:var(--color-green-soft)">27위<br />프로페서제진<br />★ 5,680<br />쿠키 20</div>
          </div>
          ${C.asset("character", "ranking")}
          <div style="margin-top:60px">${C.button("일간 랭킹 보기", { route: "rankingDaily" })}</div>
        </div>
      </section>
    `;
  }

  function shop() {
    const catalog = shopCatalog();
    const recommended = [D.products[1], D.products[1], D.products[1]].map((product) => ({
      ...product,
      name: "구글 플레이 기프트 카드 5000원",
      meta: "Google Play",
      price: 50,
      image: "googlePlay",
    }));
    const allProducts = Array.from({ length: 6 }, () => ({
      ...D.products[0],
      name: "네이버페이 포인트 5,000원",
      meta: "네이버페이 포인트",
      price: 50,
      image: "npay",
    }));
    const categories = [
      ["전체", "shopCategoryAll"],
      ["상품권", "shopCategoryGift"],
      ["편의점", "shopCategoryConvenience"],
      ["카페", "shopCategoryCafe"],
      ["음식", "shopCategoryFood"],
      ["기타", "shopCategoryEtc"],
    ];

    return C.shell({
      title: "상점",
      back: "home",
      activeNav: "shop",
      className: "ranking-shop-screen shop-screen",
      content: `
        <section class="rs-shop-hero">
          <div class="rs-shop-hero__main">
            <div>
              <span class="rs-chip is-strong">쿠키 1개 = 100원</span>
              <h2>모은 쿠키로<br />원하는 기프티콘으로!</h2>
              <p>열심히 모은 쿠키로 다양한 상품권을 교환해 보세요!</p>
            </div>
            <div class="rs-shop-hero__art">${namedAsset("character-shop-clean.png", "상점 캐릭터")}</div>
          </div>
          <div class="rs-shop-balance-row">
            <button type="button">
              <span>지금까지 모은 내 쿠키</span>
              <i aria-hidden="true">›</i>
              <strong>${C.icon("cookie")} ${escape(D.user.cookie)}개</strong>
            </button>
            <button type="button" data-route="vault">보관함</button>
          </div>
        </section>

        <div class="rs-category-tabs" aria-label="상점 카테고리">
          ${categories
            .map(
              ([label, icon], index) => `
                <button class="rs-category-tab ${index === 0 ? "is-active" : ""}">
                  <span aria-hidden="true">${C.icon(icon)}</span>
                  <strong>${escape(label)}</strong>
                </button>
              `,
            )
            .join("")}
        </div>

        <section class="rs-section">
          <div class="rs-section__header">
            <div>
              <h3>추천상품</h3>
            </div>
          </div>
          <div class="rs-shop-recommend-strip">
            ${recommended.map((product, index) => shopRecommendCard(product, index)).join("")}
          </div>
        </section>

        <section class="rs-section">
          <div class="rs-filter-bar">
            <div>
              <h3>전체상품</h3>
              <p>상품 1354687개</p>
            </div>
            <div class="rs-sort-tabs" aria-label="상품 정렬">
              <button class="is-active">인기순</button>
            </div>
          </div>
          <div class="rs-shop-product-grid">
            ${allProducts.map((product) => shopGridCard(product)).join("")}
          </div>
        </section>

        <section class="rs-event-card">
          <div>
            <span class="rs-chip is-soft">스페셜 이벤트</span>
            <strong>웹툰만 보면<br />아이패드 응모권이 열려요</strong>
            <p>매주 추첨을 통해 아이패드를 드려요.</p>
            <button class="rs-primary-button" data-route="mission">이벤트 참여</button>
          </div>
          ${namedAsset("product-ipad.png", "아이패드", "rs-event-card__image")}
        </section>
      `,
    });
  }

  function productDetail() {
    const recommendations = shopCatalog().slice(1, 4);

    return C.shell({
      title: "상품 정보",
      back: "shop",
      className: "ranking-shop-screen product-detail-screen",
      content: `
        <section class="rs-detail-hero">
          <div class="rs-detail-hero__image">${namedAsset("product-npay.png", "네이버페이 포인트 5,000P")}</div>
          <h2>네이버페이 포인트 5,000P</h2>
          <strong class="rs-price">${C.icon("cookie")} 50</strong>
        </section>

        <section class="rs-panel rs-product-info-panel">
          ${detailInfoCards()}
          <h3>상품설명</h3>
          <ul class="rs-copy-list">
            <li>네이버페이 포인트 5,000원권입니다.</li>
            <li>네이버페이 가맹점에서 사용할 수 있습니다.</li>
            <li>교환 완료 시 알림으로 안내드려요.</li>
          </ul>
        </section>

        <section class="rs-section">
          <div class="rs-section__header">
            <h3>추천 상품</h3>
          </div>
          <div class="rs-product-strip">
            ${recommendations.map((product) => productCard(product, true)).join("")}
          </div>
        </section>

        <div class="fixed-bottom-action rs-sticky-action">${C.button("교환 신청하기", { route: "exchangeApply" })}</div>
      `,
    });
  }

  function exchangeApply(checked = false) {
    return C.shell({
      title: "교환 신청",
      back: "productDetail",
      className: "ranking-shop-screen exchange-screen",
      content: `
        ${exchangeSummary()}
        ${exchangeCookieBalance()}
        ${exchangeGuide()}

        <section class="rs-exchange-warning">
          <div>
            <strong>꼭 확인해주세요!</strong>
            <ul>
              <li>교환 신청 후 취소 및 환불이 불가능해요.</li>
              <li>부정 사용시 서비스 이용이 제한될 수 있습니다.</li>
              <li>유효기간이 만료되면 사용이 불가능합니다.</li>
            </ul>
          </div>
          ${namedAsset("character-shop-clean.png", "확인 캐릭터", "rs-exchange-warning__character")}
        </section>

        <button class="rs-check-row ${checked ? "is-checked" : ""}" data-action="check">
          <span class="rs-check-row__mark">✓</span>
          <span>위 내용을 모두 확인했어요</span>
        </button>

        <div class="fixed-bottom-action rs-sticky-action">${C.button("신청 확정하기", { route: "exchangeDone", variant: "dark" })}</div>
      `,
    });
  }

  function exchangeDone() {
    return C.shell({
      title: "교환 완료",
      back: "shop",
      className: "ranking-shop-screen exchange-done-screen",
      content: `
        <section class="rs-complete-hero">
          ${namedAsset("character-shop-clean.png", "교환 완료 캐릭터", "rs-complete-hero__character")}
          <h2>교환 신청이 완료되었어요!</h2>
          <p>신청한 상품은 아래 내용으로 지급될 예정이에요.</p>
        </section>

        <section class="rs-panel rs-exchange-receipt">
          <div class="rs-info-list">
            <div><span>상품명</span><strong>네이버페이 포인트 5,000원</strong></div>
            <div><span>사용쿠키</span><strong>50개</strong></div>
            <div><span>교환일시</span><strong>2026.05.21 14:30</strong></div>
          </div>
        </section>

        <section class="rs-wallet-card is-compact rs-exchange-balance-card">
          <div>
            <span>현재 보유 쿠키</span>
            <strong>${C.icon("cookie")} 30 <small>개</small></strong>
          </div>
          <button class="rs-text-button" data-route="cookieHistory">쿠키 내역 보러가기 ›</button>
        </section>

        <div class="fixed-bottom-action rs-sticky-action stack-sm">
          ${C.button("보관함에서 확인하기", { route: "vault" })}
          ${C.button("상점으로 돌아가기", { route: "shop", variant: "outline" })}
        </div>
      `,
    });
  }

  function vault(used = false) {
    return C.shell({
      title: "보관함",
      back: "shop",
      className: "ranking-shop-screen vault-screen",
      content: `
        <div class="rs-tabs" aria-label="보관함 탭">
          <button class="rs-tab ${used ? "" : "is-active"}" data-route="vault">사용 가능</button>
          <button class="rs-tab ${used ? "is-active" : ""}" data-route="vaultUsed">사용 완료</button>
        </div>

        <h2 class="rs-vault-count">${used ? "사용 완료 2" : "사용 가능 2"}</h2>

        <div class="rs-reward-list">
          ${D.rewards.map((reward, index) => rewardCard(reward, used, index)).join("")}
        </div>

        ${used ? "" : `
          <section class="rs-vault-notice">
            <strong>안내사항</strong>
            <p>유효기간이 지난 기프티콘은 자동으로 사용 완료 처리됩니다.</p>
          </section>
        `}

        <section class="rs-vault-empty">
          ${namedAsset("character-vault-empty.svg", "보관함 캐릭터", "rs-vault-empty__character")}
          <strong>사용 가능한 보상이 더 없어요!</strong>
          <p>다양한 활동으로 쿠키를 모아<br />멋진 보상을 교환해보세요</p>
          <button type="button" data-route="mission">쿠키 모으러 가기</button>
        </section>
      `,
    });
  }

  function rewardDetail(copied = false) {
    return C.shell({
      title: "상품권 상세",
      back: "vault",
      className: "ranking-shop-screen reward-detail-screen",
      content: `
        <section class="rs-detail-hero is-voucher">
          <div class="rs-detail-hero__image">${namedAsset("product-npay.png", "네이버페이 포인트 5,000P")}</div>
          <h2>네이버페이 포인트 5,000P</h2>
        </section>

        ${barcodeCard(copied)}

        <section class="rs-panel rs-reward-info-panel">
          <div class="rs-info-list">
            <div><span>신청기간</span><strong>2026.05.20 14:30</strong></div>
            <div><span>지급일</span><strong>2026.05.21 14:30</strong></div>
            <div><span>유효기간</span><strong><em>D-28</em> 2026.06.19</strong></div>
            <div><span>사용쿠키</span><strong>50개</strong></div>
          </div>
        </section>

        ${copied ? `<div class="rs-copy-toast">바코드 번호가 복사되었습니다.</div>` : ""}
        <div class="fixed-bottom-action rs-sticky-action">${C.button("완료", { route: "vault" })}</div>
      `,
    });
  }

  window.StoritScreenRegistry.register({
    rankingDaily,
    rankingSeason,
    rankingYesterday,
    shop,
    productDetail,
    exchangeApply: () => exchangeApply(false),
    exchangeApplyChecked: () => exchangeApply(true),
    exchangeDone,
    vault: () => vault(false),
    vaultUsed: () => vault(true),
    rewardUsed: () => vault(true),
    rewardDetail: () => rewardDetail(false),
    rewardCopied: () => rewardDetail(true),
  });
})();
