const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authmiddleware.js");
const AuthController = require("../controllers.js/auth.controller");
const authController = new AuthController();

// 회원가입
router.post("/signup", authController.createUser);
// router.get("/signup", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "..", "signup.html"));
// });

// 로그인
router.post("/login", authController.signinUser);
// router.get("/signin", (req, res) => {
// res.sendFile(path.resolve(__dirname, "..", "signin.html"));

// 이메일 중복 확인
router.post("/email", authController.checkDupEmail);

// 닉네임 중복 확인
router.post("/nickname", authController.checkDupNickname);

// 로그아웃
router.get("/logout", authMiddleware, authController.logoutUser);

// 회원 탈퇴
router.delete("/delete", authMiddleware, authController.deleteUser);

module.exports = router;

// router.get("/", authController.getSwipe);
