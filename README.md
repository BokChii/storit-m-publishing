# Storit Mobile Publishing Prototype

모바일 웹앱 기준의 정적 퍼블리싱 프로토타입입니다. HTML/CSS/Vanilla JS만 사용하며, 서버/API 연동 없이 화면 이동과 기본 UI 상태를 확인할 수 있습니다.

최종 Figma 캡처는 참고 이미지로만 사용하고, 실제 화면은 HTML/CSS/Vanilla JS 컴포넌트와 Figma에서 직접 추출한 개별 에셋으로 구성합니다.

## 로컬 확인

브라우저에서 `index.html`을 직접 열어도 됩니다.

정적 서버로 확인하려면 아래 명령을 실행합니다.

```bash
npm run serve
```

접속 주소:

```text
http://127.0.0.1:4173/index.html
```

주요 화면은 해시로 바로 접근할 수 있습니다.

```text
http://127.0.0.1:4173/index.html#home
http://127.0.0.1:4173/index.html#shop
http://127.0.0.1:4173/index.html#myPage
```

## 파일 전달용 패키징

아래 명령을 실행하면 전달용 zip 파일이 `delivery/` 폴더에 생성됩니다.

```bash
npm run package
```

zip에는 실행에 필요한 파일만 포함됩니다.

- `index.html`
- `css/`
- `js/`
- `assets/`
- `docs/`
- `README.md`
- `DEPLOYMENT.md`
- `vercel.json`
- `netlify.toml`

## 코드 구조

- `index.html`: 정적 앱 진입점과 CSS/JS 로드 순서
- `css/`: 디자인 토큰, 레이아웃, 공통 컴포넌트, 화면별 스타일, 모달 스타일
- `js/data.js`: 샘플 유저/상품/랭킹/미션/약관 데이터
- `js/components.js`: 버튼, 카드, 헤더, 하단 탭 등 공통 HTML 렌더 함수
- `js/screens.js`: 화면 레지스트리. 새 화면 파일은 `StoritScreenRegistry.register()`로 route를 등록합니다.
- `js/screens/`: 도메인별 화면 구현
  - `auth.js`: 로딩, 온보딩, 가입, 약관
  - `home-mission.js`: 홈, 미션, 쿠키, 출석
  - `quiz.js`: 퀴즈 풀이, 결과, 퀴즈 만들기/상태
  - `ranking-shop.js`: 랭킹, 상점, 교환, 보관함
  - `account.js`: 마이페이지, 알림, 설정, 문의, 탈퇴
- `js/router.js`: URL hash 기반 화면 이동과 뒤로가기
- `js/modals.js`: 공통 모달 렌더링과 열기/닫기
- `js/app.js`: 앱 초기화와 전역 클릭 이벤트 연결

## 기본 검증

```bash
npm test
```

`npm test`는 등록된 route 전체가 오류 없이 HTML을 렌더링하는지 확인합니다.

## 작업 문서

- `docs/SCREEN_MAP.md`: 화면 목록, route, 주요 클릭 흐름
- `docs/QA_CHECKLIST.md`: 최종 검수 체크리스트
- `assets/README.md`: Figma 에셋 export 및 폴더 정리 규칙

## 임시 검수 URL 배포

Vercel 또는 Netlify 같은 정적 호스팅에 올려 검수용 링크를 만들 수 있습니다. 자세한 절차는 `DEPLOYMENT.md`를 참고하세요.

## 작업 범위

이번 산출물은 보이는 퍼블리싱, 화면 이동, 기본 모달/탭/선택 상태 구현까지입니다. 로그인, API, 데이터 저장, 실제 쿠폰 발급, 앱 빌드, 스토어 등록은 포함하지 않습니다.
