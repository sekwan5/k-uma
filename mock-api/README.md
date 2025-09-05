# mock-api

별도의 가상 API 서버

## 실행

```bash
yarn install
yarn dev
# 또는
npm i
npm run dev
```

기본 포트는 4000입니다. 프런트엔드에서는 /api 프록시를 통해 접근하거나,
http://localhost:4000/api 로 호출하세요.

## 엔드포인트

- GET /api/health
- GET /api/test
