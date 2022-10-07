# Tindater

- 시연영상 링크
[![틴데이터 시연영상](https://i.ytimg.com/vi/C5cSWuhuU1I/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBFIRVeH3Nu4oN24rXpnjTV_84VYA)](https://youtu.be/C5cSWuhuU1I)

- Tinder 클론코딩 협업 프로젝트

## [API 명세](./docs/API.md)

## [ERD](./docs/ERD.md)

## 프로젝트 팀원

- [codeing999](https://github.com/codeing999) : 친구 추천/좋아요/싫어요 기능
- [Minsun91](https://github.com/Minsun91) : 회원가입/로그인 기능
- [Jiwonemil](https://github.com/Jiwonemil) : 마이페이지 기능

![image](https://user-images.githubusercontent.com/109027875/186547577-aa215236-dd77-4311-be32-4e2a460ccc96.png)

## Directory Structure
```cmd
root
├─config
├─docs
├─layers
│  ├─controllers
│  ├─repositories
│  ├─routers
│  └─services
├─middlewares
├─migrations
├─models
├─modules
├─node_modules
└─seeders
```

## Packages

```json
  "dependencies": {
    "aws-sdk": "^2.1201.0",
    "cors": "^2.8.5",
    "dotenv": "^16.0.1",
    "express": "^4.18.1",
    "joi": "^17.6.0",
    "jsonwebtoken": "^8.5.1",
    "morgan": "^1.10.0",
    "mysql2": "^2.3.3",
    "nodemon": "^2.0.19",
    "sequelize": "^6.21.4",
    "sequelize-cli": "^6.4.1"
  },
  "devDependencies": {
    "jest": "^28.1.3"
  }
```



