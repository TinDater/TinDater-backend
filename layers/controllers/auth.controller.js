const AuthService = require("../services/auth.service");
module.exports = class AuthController {
  authService = new AuthService();

  //회원가입
  createUser = async (req, res, next) => {
    try {
      const {
        email,
        password,
        confirm,
        nickname,
        age,
        address,
        gender,
        interest,
        imageUrl,
      } = req.body;

      //비밀번호 확인: 비밀번호와 비밀번호 확인란의 값이 같지 않다면 false 반환
      if (password !== confirm) {
        res.status(400).send({
          msg: "패스워드가 패스워드 확인란과 동일하지 않습니다.",
          success: false,
        });
        // return;
      }

      const createUserData = await this.authService.createUser(
        email,
        password,
        confirm,
        nickname,
        age,
        address,
        gender,
        interest,
        imageUrl
      );
      return res.send({
        status: createUserData.status,
        msg: createUserData.msg,
        success: createUserData.success,
      });
    } catch (err) {
      console.log(err);
      return { success: false, msg: err.message };
    }
  };

  //중복된 이메일 /유효성 검사

  checkDupEmail = async (req, res, next) => {
    try {
      const { email } = req.body;
      console.log(email);

      //유효성 검사
      const checkEmailEffectivenessData =
        await this.authService.checkEmailEffectiveness(email);

      if (!checkEmailEffectivenessData.success) {
        return res.send({
          msg: checkEmailEffectivenessData.msg,
          success: checkEmailEffectivenessData.success,
        });
      }

      //이메일 중복 검사
      const checkDupEmailData = await this.authService.checkEmailEffectiveness(
        email
      );
      if (checkDupEmailData);
      return res.send({
        msg: checkDupEmailData.msg,
        success: checkDupEmailData.success,
      });
    } catch (err) {
      console.log(err);
      return { success: false, msg: err.message };
    }
  };

  //닉네임 중복 /유효성 검사
  checkDupNickname = async (req, res, next) => {
    try {
      const { nickname } = req.body;

      const checkNicknameEffectivenessData =
        await this.authService.checkNicknameEffectiveness(nickname);

      return res.send({
        status: 400,
        msg: checkNicknameEffectivenessData.msg,
        success: checkNicknameEffectivenessData.success,
      });
    } catch (err) {
      console.log(err);
      return { success: false, msg: err.message };
    }
  };

  //로그인
  login = async (req, res, next) => {
    try {
      const { email, password, x, y } = req.body;

      const loginData = await this.authService.login(email, password);

      if (loginData.success == true) {
        return res.status(loginData.status).json({
          success: loginData.success,
          msg: loginData.msg,
          data: {
            token: loginData.token,
            userId: loginData.userId,
            email: loginData.email,
            age: loginData.age,
            address: loginData.address,
            gender: loginData.gender,
            interest: loginData.interest.split(""),
            nickname: loginData.nickname,
            imageUrl: loginData.imageUrl,
          },
        });
      } else {
        return res.status(loginData.status).json({
          success: loginData.success,
          msg: loginData.msg,
        });
      }
    } catch (err) {
      console.log(err);
      return { success: false, msg: err.message };
    }
  };
  checkToken = async (req, res, next) => {
    const { userId, nickname } = res.locals;
    try {
      if (!nickname)
        return res.status(400).json({ success: false, nickname: "" });

      const { imageUrl } = await this.authService.getImageUrl(userId);

      return res
        .status(200)
        .json({ success: true, userId, nickname, imageUrl });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ success: false, msg: err.message });
    }
  };
};
