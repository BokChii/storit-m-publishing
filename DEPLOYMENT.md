# 배포 및 전달 가이드

## 1. 파일 전달

대표님 또는 후속 프론트 개발자에게 파일 형태로 전달할 때는 아래 명령으로 zip을 생성합니다.

```bash
npm run package
```

생성 예시:

```text
delivery/storit-publishing-20260610-1530.zip
```

전달 시에는 아래처럼 설명하면 됩니다.

```text
퍼블리싱 산출물 압축 파일 전달드립니다.
index.html 기준으로 열어보실 수 있고, 후속 개발자분은 css/js/assets 폴더 구조를 기준으로 이어서 작업하시면 됩니다.
```

## 2. 임시 검수용 URL

실서비스 배포가 아니라 대표님 확인용 링크를 만들 때 사용합니다.

현재 생성된 검수 링크:

```text
https://storit-mobile-publishing.vercel.app
```

참고: `storit.vercel.app`은 이미 사용 중이라 현재 프로젝트 alias로 등록할 수 없습니다.

### Vercel

Vercel CLI를 사용합니다.

```bash
npm run deploy:preview
```

또는 운영 URL처럼 고정 배포가 필요하면 아래를 사용합니다.

```bash
npm run deploy:prod
```

처음 실행 시 Vercel 로그인과 프로젝트 연결을 묻습니다. 정적 사이트이므로 별도 빌드 명령은 없습니다.

### Netlify

Netlify CLI를 사용하는 경우 아래처럼 배포할 수 있습니다.

```bash
npx netlify deploy --dir .
```

운영 URL처럼 게시하려면 아래를 사용합니다.

```bash
npx netlify deploy --prod --dir .
```

## 대표님께 안내할 때 쓸 문장

```text
검수 편의를 위해 임시 확인용 URL도 함께 공유드리겠습니다.
다만 해당 링크는 최종 서비스 배포가 아니라 퍼블리싱 확인용이며, 실제 서비스 배포/도메인 연결/API 연동/앱 빌드는 후속 개발 범위로 보고 있습니다.
```
