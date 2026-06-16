# 화면 목록 및 클릭 흐름

이 문서는 최종 Figma 캡처를 참고해 현재 정적 프로토타입에 구현된 화면과 이동 흐름을 정리합니다. 모든 화면은 `index.html#routeName` 형식으로 직접 접근할 수 있습니다.

실제 런타임 화면은 전체 화면 PNG가 아니라 HTML/CSS/Vanilla JS 컴포넌트와 Figma에서 직접 추출한 개별 에셋으로 구성합니다.

## 검수 기본 링크

```text
https://storit-mobile-publishing.vercel.app
```

예시:

```text
https://storit-mobile-publishing.vercel.app/#home
https://storit-mobile-publishing.vercel.app/#shop
https://storit-mobile-publishing.vercel.app/#myPage
```

## 화면 그룹

화면 구현은 유지보수를 위해 아래 파일로 나누었습니다.

| 파일 | 담당 화면 |
| --- | --- |
| `js/screens/auth.js` | 로딩, 온보딩, 가입, 약관 |
| `js/screens/home-mission.js` | 홈, 오늘의 미션, 쿠키 굽기, 출석 |
| `js/screens/quiz.js` | 퀴즈 풀이, 결과, 퀴즈 만들기, 심사/승인/반려 |
| `js/screens/ranking-shop.js` | 랭킹, 상점, 교환, 보관함, 상품권 상세 |
| `js/screens/account.js` | 마이페이지, 알림, 환경설정, 문의, 회원 탈퇴 |

| 그룹 | Route | 목적 | Figma 후 확인 |
| --- | --- | --- | --- |
| 진입 | `loading` | 서비스 로딩/첫 진입 | 배경 이미지, 로고, 캐릭터 |
| 온보딩 | `onboarding1` | 퀴즈/쿠키 소개 | 배경, 카피, 캐릭터 |
| 온보딩 | `onboarding2` | 상점/보상 소개 | 배경, 카피, 캐릭터 |
| 온보딩 | `onboarding3` | 랭킹 소개 | 배경, 카피, 캐릭터 |
| 가입 | `signup` | 소셜 회원가입 선택 | 로고, 버튼 간격, 소셜 아이콘 |
| 약관 | `termsAgree` | 약관 동의 | 체크 상태, 약관명 |
| 약관 | `termService` | 서비스 이용약관 상세 | 실제 약관 전문 |
| 약관 | `termAge` | 14세 이상 약관 상세 | 실제 약관 전문 |
| 약관 | `termPrivacy` | 개인정보 처리방침 상세 | 실제 약관 전문 |
| 약관 | `termMarketing` | 마케팅 수신 동의 상세 | 실제 약관 전문 |
| 홈 | `home` | 앱 메인/웹툰 퀴즈 목록 | 배너, 카드, 아이콘, 하단 탭 |
| 미션 | `mission` | 오늘의 미션 진행 | 재료 아이콘, 완료 상태 |
| 미션 | `missionAllDone` | 모든 재료 완료 리스트 | 완료 체크 상태 |
| 미션 | `missionDone` | 모든 재료 수집 완료 | 캐릭터, CTA |
| 미션 | `baking` | 쿠키 굽는 중 | 오븐 배경, 로딩 모션 |
| 미션 | `cookieComplete` | 쿠키 완성 | 배경, 캐릭터, 말풍선 |
| 미션 | `cookieReward` | 쿠키 획득 완료 | 보유 쿠키 카드 |
| 출석 | `attendance` | 출석체크 기본 | 달력 스타일, 캐릭터 |
| 출석 | `attendanceReward` | 출석 미션 보상 상태 | 하단 보상 배너 |
| 퀴즈 | `quiz` | 퀴즈 풀이 | 진행바, 보기, 캐릭터 |
| 퀴즈 | `quizSelected` | 답 선택 상태 | 선택 색상 |
| 퀴즈 | `quizResultGood` | 70점 이상 결과 | 점수 원형, 평가 UI |
| 퀴즈 | `quizResultLow` | 69점 이하 결과 | 점수 원형, 캐릭터 |
| 내 퀴즈 | `myQuiz` | 내 퀴즈 대시보드 | 배너, 통계, 목록 |
| 내 퀴즈 | `quizCreate` | 퀴즈 만들기 | 웹툰/회차 선택 UI |
| 내 퀴즈 | `quizSubmitted` | 퀴즈 등록 완료 | 배경, 캐릭터 |
| 내 퀴즈 | `quizReview` | 심사 중 상세 | 상태 배지 |
| 내 퀴즈 | `quizApproved` | 승인 완료 상세 | 참여 통계 |
| 내 퀴즈 | `quizRejected` | 반려 상세 | 반려 사유 박스 |
| 랭킹 | `rankingDaily` | 일간 랭킹 | 랭킹 카드, 표 |
| 랭킹 | `rankingSeason` | 시즌 랭킹 | 포디움, 배너 |
| 랭킹 | `rankingYesterday` | 전일 순위 발표 | 배경, 수상 카드 |
| 상점 | `shop` | 상품 목록/카테고리 | 상품 이미지, 배너 |
| 상점 | `productDetail` | 상품 정보 | 상품 이미지, 설명 카드 |
| 교환 | `exchangeApply` | 교환 신청 | 안내 카드, 체크박스 |
| 교환 | `exchangeApplyChecked` | 교환 확인 체크 상태 | 체크 상태 |
| 교환 | `exchangeDone` | 교환 완료 | 완료 캐릭터, 정보 테이블 |
| 보관함 | `vault` | 사용 가능 보상 | 상품권 카드 |
| 보관함 | `vaultUsed` | 사용 완료 보상 | 탭/상태 |
| 보관함 | `rewardUsed` | 사용 완료 목록 alias | 탭/상태 |
| 보관함 | `rewardDetail` | 상품권 상세 | 바코드/정보 테이블 |
| 보관함 | `rewardCopied` | 바코드 복사 상태 | 복사 버튼 상태 |
| 마이페이지 | `myPage` | 프로필/태그/보상/퀴즈 | 캐릭터, 카드 간격 |
| 알림 | `notifications` | 새 소식 | 알림 아이콘 |
| 알림 | `notificationsDone` | 확인 완료 | 탭 상태 |
| 설정 | `settings` | 환경설정 | 토글/리스트 |
| 문의 | `inquiry` | 문의 작성 | 입력 폼 |
| 문의 | `inquiryDone` | 문의 완료 | 완료 아이콘 |
| 탈퇴 | `withdraw` | 회원 탈퇴 | 안내 카드, 캐릭터 |

## 주요 클릭 흐름

| 시작 | 동작 | 도착 |
| --- | --- | --- |
| `loading` | 쿠키 구우러 가기 | `onboarding1` |
| `onboarding1` | 쿠키 획득하러 가기 | `onboarding2` |
| `onboarding2` | 쿠키 획득하러 가기 | `onboarding3` |
| `onboarding3` | 시작하기 | `signup` |
| `signup` | 소셜 회원가입 버튼 | `termsAgree` |
| `termsAgree` | 다음 | `home` |
| `home` | 오늘의 미션 | `mission` |
| `mission` | 남은 재료 바로가기 | `missionAllDone` |
| `missionAllDone` | 완료 상태 보기 | `missionDone` |
| `missionDone` | 초코칩 쿠키 굽기 시작 | `baking` |
| `baking` | 약 3초 후 자동 전환 | `cookieComplete` |
| `cookieComplete` | 완성 연출 후 자동 전환 | `cookieReward` |
| `home` | 출석체크 | `attendance` |
| `attendance` | 출석하기 | `attendanceReward` |
| `home` | 퀴즈 보기 | `quiz` |
| `quiz` | 답 선택 화면 보기 | `quizSelected` |
| `quizSelected` | 결과 보기 | `quizResultGood` |
| `quizResultGood` | 랭킹 보러가기 | `rankingDaily` |
| `home` | 하단 랭킹 탭 | `rankingDaily` |
| `rankingDaily` | 시즌 랭킹 탭 | `rankingSeason` |
| `home` | 하단 상점 탭 | `shop` |
| `shop` | 상품 카드 | `productDetail` |
| `productDetail` | 교환 신청하기 | `exchangeApply` |
| `exchangeApply` | 신청 확정하기 | `exchangeDone` |
| `exchangeDone` | 보관함에서 확인하기 | `vault` |
| `vault` | 사용하기 | `rewardDetail` |
| `rewardDetail` | 바코드 번호 복사 | `rewardCopied` |
| `home` | 하단 마이페이지 탭 | `myPage` |
| `myPage` | 설정 아이콘 | `settings` |
| `settings` | 문의하기 | `inquiry` |
| `inquiry` | 문의하기 | `inquiryDone` |
| `settings` | 회원 탈퇴 | `withdraw` |
| `myPage` | 내 퀴즈 가기 | `myQuiz` |
| `myQuiz` | 퀴즈 만들러 가기 | `quizCreate` |
| `quizCreate` | 문제 등록하기 | `quizSubmitted` |

## 현재 모달

| Modal id | 열리는 대표 위치 | 용도 |
| --- | --- | --- |
| `logout` | `settings` | 로그아웃 확인 |
| `editLife` | `myPage` | 인생 웹툰/태그 수정 확인 |
| `editGenre` | `myPage` | 좋아하는 장르 수정 확인 |
| `quitQuiz` | `quizCreate` | 작성 중단 확인 |
| `cookieShortage` | 수동 연결 예정 | 보유 쿠키 부족 |
| `issueFailed` | 수동 연결 예정 | 쿠폰 발급 실패 |
| `adHeart` | 수동 연결 예정 | 광고 충전 안내 |
| `inviteReward` | 수동 연결 예정 | 친구 초대 보상 안내 |
| `invite` | `home`, `shop` | 친구 초대 링크 |

## Figma 수령 후 재점검

- 화면 수가 PNG 65장 대비 늘거나 줄었는지 확인한다.
- `수동 연결 예정` 모달이 최종 시안에서 어느 버튼에 연결되는지 확인한다.
- 약관 전문과 마케팅/개인정보 문구가 최종인지 확인한다.
- 온보딩/로딩/미션 완료처럼 이미지 의존도가 큰 화면은 Figma 에셋으로 교체 후 다시 QA한다.
