(function () {
  const ingredients = [
    { name: "버터", icon: "butter", task: "출석체크 하기", done: false },
    { name: "밀가루", icon: "flour", task: "웹툰 2개 풀기", done: true },
    { name: "우유", icon: "milk", task: "친구 초대하기", done: true },
    { name: "설탕", icon: "sugar", task: "웹툰 5개 풀기", done: false },
    { name: "초콜릿", icon: "chocolate", task: "응원 한마디 작성하기", done: false },
  ];

  const webtoons = [
    { title: "66666년 만에 환생한 흑마법사", genre: ["사이다", "사이다"], action: "퀴즈 보기", thumb: "darkMage", provider: "naver", providerIcon: "providerSeries" },
    { title: "천정", genre: ["로맨스", "설렘폭발"], action: "퀴즈 보기", thumb: "romance", provider: "kakao", providerIcon: "providerKakaoPage" },
    { title: "A.I. 닥터", genre: ["사이다", "사이다"], action: "퀴즈 보기", thumb: "aiDoctor", provider: "naver", providerIcon: "providerWebtoon" },
    { title: "서포터가 다 해 먹음", genre: ["판타지", "마법"], action: "퀴즈 보기", thumb: "supporter", provider: "kakao", providerIcon: "providerKakaoPage" },
    { title: "회귀자의 은퇴라이프", genre: ["사이다", "사이다"], action: "퀴즈 보기", thumb: "retireLife", provider: "naver", providerIcon: "providerSeries" },
  ];

  const products = [
    { name: "네이버페이 포인트 5,000원", brand: "N pay", price: 50, type: "gift", image: "npay" },
    { name: "구글 플레이 기프트 카드 5000원", brand: "Google Play", price: 50, type: "card", image: "googlePlay" },
    { name: "스타벅스 아메리카노", brand: "Coffee", price: 80, type: "drink", image: "googlePlay" },
    { name: "편의점 모바일 금액권", brand: "Store", price: 60, type: "gift", image: "npay" },
  ];

  const assetPath = "./assets/figma-exported/named/";
  const assetImages = {
    characters: {
      default: assetPath + "character-chef.png",
      chef: assetPath + "character-chef.png",
      chefDough: assetPath + "character-chef.png",
      chefOven: assetPath + "character-chef-oven.png",
      chefTable: assetPath + "character-recipe-chef.png",
      tray: assetPath + "character-quiz-result-tray.svg",
      basket: assetPath + "character-shop-clean.png",
      ranking: assetPath + "character-ranking-medal.svg",
      rankingMedal: assetPath + "character-ranking-medal.svg",
      rankingLevel: assetPath + "character-ranking.png",
      score: assetPath + "character-score.png",
      avatar: assetPath + "avatar-cookie-clean.png",
      newspaper: assetPath + "character-newspaper.png",
      shop: assetPath + "character-shop-clean.png",
      sad: assetPath + "character-withdraw-sad.svg",
      heroChef: assetPath + "character-shop-clean.png",
      recipeChef: assetPath + "character-recipe-chef.png",
      shopBack: assetPath + "character-shop-back.svg",
      vaultEmpty: assetPath + "character-vault-empty.svg",
    },
    icons: {
      cookie: assetPath + "icon-cookie.png",
      rewardCookie: assetPath + "onboarding1-cookie.svg",
      missionCookie: assetPath + "icon-mission-chef-cookie.png",
      missionTimer: assetPath + "icon-mission-timer.png",
      quizWriting: assetPath + "icon-quiz-writing-cookie.png",
      quizGuideChef: assetPath + "quiz-create-guide-cookie.svg",
      question: assetPath + "icon-quiz-question.svg",
      quizQuestion: assetPath + "icon-quiz-question.svg",
      settingsCookie: assetPath + "icon-settings-gear-cookie.png",
      cookieExp: assetPath + "icon-cookie-exp.png",
      resultCorrect: assetPath + "icon-quiz-result-correct.svg",
      resultTime: assetPath + "icon-quiz-result-time.svg",
      resultScore: assetPath + "icon-quiz-result-score.svg",
      ratingGood: assetPath + "icon-rating-good.svg",
      ratingEasy: assetPath + "icon-rating-easy.svg",
      ratingHard: assetPath + "icon-rating-hard.svg",
      myQuizRegistered: assetPath + "icon-myquiz-registered.svg",
      myQuizPlays: assetPath + "icon-myquiz-plays.svg",
      myQuizAccuracy: assetPath + "icon-myquiz-accuracy.svg",
      myQuizTime: assetPath + "icon-myquiz-time.svg",
      shopCategoryAll: assetPath + "icon-shop-category-all.svg",
      shopCategoryGift: assetPath + "icon-shop-category-gift.svg",
      shopCategoryConvenience: assetPath + "icon-shop-category-convenience.svg",
      shopCategoryCafe: assetPath + "icon-shop-category-cafe.svg",
      shopCategoryFood: assetPath + "icon-shop-category-food.svg",
      shopCategoryEtc: assetPath + "icon-shop-category-etc.svg",
      cookieLevelUp: assetPath + "icon-cookie-level-up.png",
      cookieWings: assetPath + "icon-cookie-wings.png",
      home: assetPath + "nav-home.svg",
      ranking: assetPath + "nav-ranking.svg",
      shop: assetPath + "nav-shop.svg",
      mypage: assetPath + "nav-mypage.svg",
      homeBannerCookie: assetPath + "home-banner-cookie.svg",
      homeQuizCookie: assetPath + "home-quiz-cookie.svg",
      homeQuizMoney: assetPath + "home-quiz-money.svg",
      homeCheerCookie: assetPath + "home-cheer-cookie.svg",
      homeProfileAvatar: assetPath + "home-profile-avatar.svg",
      homeHeart: assetPath + "home-heart.svg",
      homeHeartPair: assetPath + "home-heart-pair.svg",
      homeMail: assetPath + "home-mail.svg",
      homeHeartMaxBubble: assetPath + "home-heart-max-bubble.svg",
      homeMission: assetPath + "icon-home-mission.svg",
      homeAttendance: assetPath + "icon-home-attendance.svg",
      homeInvite: assetPath + "icon-home-invite.svg",
      homeMyQuiz: assetPath + "icon-home-myquiz.svg",
      butter: assetPath + "ingredient-butter.svg",
      flour: assetPath + "ingredient-flour.svg",
      milk: assetPath + "ingredient-milk.svg",
      sugar: assetPath + "ingredient-sugar.svg",
      chocolate: assetPath + "ingredient-chocolate.svg",
      missionRewardCookie: assetPath + "mission-reward-cookie.svg",
      providerSeries: assetPath + "icon-provider-series.png",
      providerKakaoPage: assetPath + "icon-provider-kakao-page.png",
      providerWebtoon: assetPath + "icon-provider-webtoon.png",
      noticeCookieOpen: assetPath + "icon-notice-cookie-open.svg",
      noticeTrophy: assetPath + "icon-notice-trophy.svg",
      cookiePlain: assetPath + "icon-notice-cookie.svg",
      cookiePaid: assetPath + "icon-notice-cookie-paid.svg",
      megaphone: assetPath + "icon-notice-megaphone.svg",
      clipboard: assetPath + "icon-notice-clipboard-ok.svg",
      reject: assetPath + "icon-notice-clipboard-reject.svg",
      rejectReason: assetPath + "icon-notice-clipboard-reject.svg",
    },
    products: {
      "N pay": assetPath + "product-npay.png",
      npay: assetPath + "product-npay.png",
      Play: assetPath + "product-google-play.png",
      "Google Play": assetPath + "product-google-play.png",
      googlePlay: assetPath + "product-google-play.png",
      ipad: assetPath + "product-ipad.png",
    },
    posters: {
      WEB: assetPath + "thumb-dark-mage.png",
      AI: assetPath + "thumb-ai-doctor.png",
      darkMage: assetPath + "thumb-dark-mage.png",
      romance: assetPath + "thumb-romance.png",
      aiDoctor: assetPath + "thumb-ai-doctor.png",
      aiDoctorDark: assetPath + "thumb-ai-doctor-dark.png",
      supporter: assetPath + "thumb-supporter.png",
      retireLife: assetPath + "thumb-retire-life.png",
    },
    logos: {},
    backgrounds: {
      home: assetPath + "bg-home-banner.png",
      onboarding1: assetPath + "bg-oven.png",
      onboarding2: assetPath + "bg-ranking-podium.png",
      onboarding3: assetPath + "bg-shop-onboarding.png",
      rankingPodium: assetPath + "bg-ranking-podium.png",
      baking: assetPath + "bg-oven.png",
      complete: assetPath + "bg-oven.png",
      splash: assetPath + "bg-oven.png",
      shop: assetPath + "bg-shop.png",
    },
  };

  const rewards = [
    { name: "네이버페이 포인트 5,000원", status: "사용가능", date: "~2026.05.21", dday: "D-28" },
    { name: "네이버페이 포인트 5,000원", status: "사용가능", date: "~2026.05.21", dday: "D-28" },
  ];

  const invite = {
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
    referenceImages: {
      linkModal: "./assets/reference/friend-invite/invite-link-modal.png",
      rewardModal: "./assets/reference/friend-invite/invite-reward-modal.png",
      copyToast: "./assets/reference/friend-invite/invite-copy-toast.png",
    },
  };

  const notices = [
    ["오늘의 퀴즈가 오픈됐어요!", "새로운 쿠키를 구워볼 시간이에요.", "방금 전", "cookie"],
    ["TOP30 까지 12점 남았어요!", "퀴즈 1개만 더 풀면 진입 가능!", "3분 전", "trophy"],
    ["쿠키 20개가 지급되었어요!", "지금 상점에서 사용해보세요.", "10분 전", "cookie"],
    ["신규 이벤트가 시작됐어요!", "7일 연속 출석 시 쿠키 3개 지급!", "방금 전", "megaphone"],
    ["퀴즈가 승인되었어요!", "내 퀴즈가 세상 밖으로 나왔어요.", "방금 전", "clipboard"],
    ["퀴즈가 반려되었어요!", "이유를 확인하고, 재등록 하세요.", "방금 전", "reject"],
  ];

  const ranking = [
    ["무게대마왕", "22,110", "▲ 1"],
    ["무게대마왕", "22,110", "▼ 1"],
    ["무게대마왕", "22,110", "-"],
    ["무게대마왕", "822점", "-"],
    ["은빛여우", "18,672", "-"],
    ["불꽃기사", "17,954", "-"],
    ["어둠의주술사", "16,738", "-"],
    ["빛의수호자", "15,623", "-"],
    ["전장의영웅", "14,987", "-"],
    ["설원의궁수", "14,560", "-"],
  ];

  const termsText = {
    service:
      "본 약관은 프레시밀크가 제공하는 스토릿 서비스의 이용과 관련하여 회사와 회원 간의 권리, 의무 및 책임사항을 규정합니다. 회원은 서비스 내 웹툰 퀴즈 정답, 이벤트 참여 등의 활동을 통해 회사에서 정한 기준에 따라 포인트를 적립받을 수 있습니다. 적립된 포인트는 회사가 정한 방법 및 제휴처에서 사용할 수 있으며, 현금 환급 가능 여부 및 비율은 서비스 내 별도 고지에 따릅니다.",
    age:
      "스토릿은 관련 법령에 의거하여 만 14세 미만 아동의 개인정보 보호를 위해 회원가입을 제한하고 있습니다. 가입 신청자는 본인의 연령이 만 14세 이상임을 확인하며, 허위로 가입한 사실이 확인될 경우 서비스 이용 제한 및 회원 탈퇴 조치를 취할 수 있습니다.",
    privacy:
      "회사는 소셜 로그인 및 서비스 제공을 위해 이메일 주소, 닉네임, 프로필 사진, 서비스 이용기록, 쿠키 적립 및 사용 내역을 수집할 수 있습니다. 개인정보는 회원 탈퇴 시 또는 개인정보 수집 및 이용 목적 달성 후 지체 없이 파기됩니다.",
    marketing:
      "스토릿은 다양한 혜택 및 정보 제공을 위해 마케팅 목적의 개인정보를 처리합니다. 본 동의는 선택 사항이며 동의하지 않더라도 기본 서비스는 이용할 수 있습니다. 동의는 서비스 내 설정 메뉴에서 언제든지 철회할 수 있습니다.",
  };

  window.StoritData = {
    user: {
      name: "감자도리",
      level: 8,
      progress: 67,
      cookie: 80,
      score: 822,
      rank: 33,
    },
    ingredients,
    webtoons,
    products,
    rewards,
    invite,
    notices,
    ranking,
    termsText,
    assetImages,
  };
})();
