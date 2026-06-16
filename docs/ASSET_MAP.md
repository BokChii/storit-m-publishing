# Figma Export Asset Map

이 문서는 `assets/figma-exported/raw/`의 개별 Figma export PNG를 검사해 런타임에서 재사용하기 쉬운 named asset으로 정리한 기록입니다.

- 검사 대상: `assets/figma-exported/raw/*.png`
- 제외 대상: `assets/screens/*.png` 전체 화면 캡처
- 검사 방법: raw PNG 크기/용량 확인, 임시 contact sheet(`/tmp/figma-asset-sheets/*.png`) 생성, 유력 후보 개별 확대 확인

## Named Icon Assets

| Named asset | Raw SHA | 판정 |
| --- | --- | --- |
| `icon-cookie.png` | `4f78643c191ed9b1c021b3263703491e133851ff` | 쿠키/코인 대체용으로 쓸 수 있는 단독 쿠키 아이콘 |
| `icon-mission-timer.png` | `55b5d2d876b4f050828216b11319ddbc26c2d157` | 하트 2개, 플러스, 남은 시간이 들어간 미션/타이머 배지 |
| `icon-cookie-level-up.png` | `62dca10e313679a134ed99283fefc64d307e0a6f` | `LEVEL UP!` 쿠키 보상 일러스트 |
| `icon-cookie-exp.png` | `772ed81a944ff614095cc89a23d60a9d06bb776d` | `EXP +100` 쿠키 보상 일러스트 |
| `icon-cookie-wings.png` | `f716fed4246d8c4cad89ce0bafdf9c0ee38e45f8` | 날개 달린 쿠키 보상 일러스트 |
| `icon-settings-gear-cookie.png` | `d35a1df16e1b3567976fdd78e68e282e56707458` | 설정/관리 성격에 가까운 쿠키+기어 일러스트 |
| `icon-quiz-writing-cookie.png` | `62724515db93dbb1c30aa1320f623222f6dd351d` | 내 퀴즈/작성 상태에 가까운 책상 앞 쿠키 일러스트 |
| `icon-mission-chef-cookie.png` | `ae055df04d283ea463ae9a8c0bf9d1846aa4af22` | 미션/제작 흐름에 가까운 셰프 쿠키 일러스트 |

## 오늘의 미션 플로우 에셋

| Named asset | 분류 | 사용 위치 |
| --- | --- | --- |
| `icon-mission-check-green.svg` | 완료 상태 체크 아이콘 | `#mission`, `#missionDone` 재료 완료 표시 |
| `mission-purple-scallop.svg` | 보라색 물결 장식 배경 | `#cookieReward` 이후 홈 진입 시 표시되는 경험치 획득 모달 상단 장식 |
| `quiz-submitted-chef.svg` | 거품기 셰프 쿠키 캐릭터 | `#missionDone` 모든 재료 수집 완료 카드 |
| `cookie-reward-confetti.svg` | 색종이 배경 레이어 | `#cookieReward` 쿠키 획득 완료 상단 연출 |
| `cookie-reward-hero.svg` | 오븐 앞 셰프 쿠키 보상 일러스트 | `#cookieReward` 쿠키 획득 완료 히어로 |

## 요청 항목별 확인 결과

| 요청 항목 | 결과 |
| --- | --- |
| 홈 퀵메뉴: 오늘의 미션 | 정확한 glyph는 없음. `icon-mission-timer.png`, `icon-mission-chef-cookie.png`가 가장 가까운 raw 후보 |
| 홈 퀵메뉴: 출석체크 | raw 개별 에셋에서 전용 출석/체크 아이콘을 찾지 못함 |
| 홈 퀵메뉴: 친구 초대 | raw 개별 에셋에서 전용 친구/초대 아이콘을 찾지 못함 |
| 홈 퀵메뉴: 내 퀴즈 | 전용 퀴즈 glyph는 없음. `icon-quiz-writing-cookie.png`가 가장 가까운 raw 후보 |
| 하단 탭: 홈, 랭킹, 상점, 마이페이지 | raw 개별 에셋에서 탭용 선형/채움 아이콘을 찾지 못함 |
| 미션 재료: 버터, 밀가루, 우유, 설탕, 초콜릿 | raw 개별 에셋에서 분리된 재료 아이콘을 찾지 못함. 일부 배경형 오븐 이미지 안에 재료가 포함되어 있으나 개별 아이콘으로 쓰기에는 부적합 |
| 설정/알림/랭킹/상점: 트로피 | raw 개별 에셋에서 찾지 못함 |
| 설정/알림/랭킹/상점: 메가폰 | raw 개별 에셋에서 찾지 못함 |
| 설정/알림/랭킹/상점: clipboard/check | raw 개별 에셋에서 찾지 못함 |
| 설정/알림/랭킹/상점: gift | raw 개별 에셋에서 찾지 못함 |
| 설정/알림/랭킹/상점: store/cafe/food | 소형 아이콘은 없음. 상점/오븐/매대 배경 일러스트만 존재 |
| 설정/알림/랭킹/상점: more | raw 개별 에셋에서 찾지 못함 |
| 쿠키/코인 | `icon-cookie.png`로 정리 완료 |

## Notes

- 현재 raw export 묶음은 이미지 fill 중심이라, 하단 탭/설정/알림에 쓰이는 벡터 아이콘류는 대부분 PNG로 분리되어 있지 않습니다.
- `assets/screens/*.png`는 매핑 또는 복사 대상으로 사용하지 않았습니다.
