> 작성일 : 2022-08-24

| 설명                 | Method | 경로                        | Bearer 토큰 필요 | 담당자      |
| :------------------- | :----- | :-------------------------- | :--------------- | :---------- |
| 회원가입             | POST   | /api/auth/signup            |                  | @Minsun91   |
| 이메일 중복 확인     | POST   | /api/auth/email             |                  | @Minsun91   |
| 닉네임 중복 확인     | POST   | /api/auth/nickname          |                  | @Minsun91   |
| 로그인               | POST   | /api/auth/login             |                  | @Minsun91   |
| 토큰 체크            | GET    | /api/auth                   | O                | @Minsun91   |
| 마이 페이지 확인     | GET    | /api/user/:userId           | O                | @Jiwonemil  |
| 마이 페이지 수정     | PATCH  | /api/user/:userId           | O                | @Jiwonemil  |
| 프로필 사진 수정     | PATCH  | /api/user/:userId/image     | O                | @codeing999 |
| 유저 위치 정보 수정  | PATCH  | /api/user/:userId/coord     | O                |             |
| 친구 추천 (첫페이지) | GET    | /api/people/:userId/like    | O                | @codeing999 |
| 좋아요 (스와이프)    | POST   | /api/people/:userId/like    | O                | @codeing999 |
| 싫어요 (스와이프)    | POST   | /api/people/:userId/dislike | O                | @codeing999 |
| 내가 좋아요한 사람   | GET    | /api/people/:userId/like    | O                | @Jiwonemil  |
