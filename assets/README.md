# 에셋 폴더 가이드

최종 Figma 캡처는 참고 이미지로만 사용합니다. 실제 런타임 화면은 HTML/CSS 컴포넌트와 `assets/figma-exported/named/`에 있는 개별 에셋으로 구성합니다.

## 폴더 구조

```text
assets/
  figma-exported/named/  Figma에서 직접 추출한 캐릭터/배경/상품 이미지
  backgrounds/  배경 이미지, 오븐/상점/온보딩 배경
  characters/   실록이/쿠키 캐릭터, 상태별 캐릭터
  icons/        메뉴, 상태, 알림, 미션, 설정 아이콘
  logos/        Storit 로고, 소셜 로그인 로고
  products/     N pay, Google Play, 상품권/기프티콘 이미지
  ui/           하단 물결, confetti, 말풍선, 장식 요소
```

## 파일명 규칙

| 유형 | 예시 |
| --- | --- |
| 로고 | `logos/storit-logo.png` |
| 캐릭터 | `characters/siloki-chef.png` |
| 상태 캐릭터 | `characters/siloki-sad.png` |
| 배경 | `backgrounds/oven-room.png` |
| 상품 | `products/npay-5000.png` |
| 아이콘 | `icons/nav-home.svg` |
| UI 장식 | `ui/bottom-scallop.svg` |

## Export 권장값

- 아이콘/단순 도형: SVG 우선
- 캐릭터/배경/상품 이미지: PNG 또는 WebP
- 투명 배경이 필요한 캐릭터/아이콘: PNG transparent
- 배경처럼 꽉 차는 이미지: 2x 기준 export 권장
- 같은 이미지가 여러 화면에서 반복되면 한 파일만 저장하고 재사용

## 교체 순서

1. 로고와 소셜 로그인 아이콘
2. 하단 물결/공통 UI 장식
3. 실록이 캐릭터 상태별 이미지
4. 온보딩/로딩/미션 배경 이미지
5. 상점 상품 이미지
6. 알림/미션/설정 아이콘

## 코드 교체 기준

화면 구현은 `js/screens/*.js`의 컴포넌트형 화면과 `assets/figma-exported/named/`의 개별 에셋을 기준으로 합니다. 참고용 전체 화면 PNG는 런타임과 전달 zip에서 제외합니다.

교체 후에는 반드시 375px 기준에서 이미지 비율, 크롭, 텍스트 겹침 여부를 확인합니다.
