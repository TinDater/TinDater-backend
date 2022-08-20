const AuthMiddleware = require("../../middlewares/authmiddleware");
const AuthRepository = require("../repositories/auth.repository");
const Joi = require("Joi");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const env = process.env;

module.exports = class AuthService {
  authRepository = new AuthRepository();

  //회원가입 : email, password,,, 유저 데이터베이스에 추가
  // return msg: {"회원가입을 축하드립니다!" , success : true}
  createUser = async (
    email,
    password,
    confirm,
    nickname,
    age,
    address,
    gender,
    interest,
    imageUrl
  ) => {
    const createUserData = await this.authRepository.createUser(
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

    if (createUserData.length !== 0) {
      return {
        status: 200,
        msg: "회원가입을 축하드립니다!",
        success: true,
      };
    } else
      return {
        status: 400,
        msg: "회원가입에 실패했습니다. ",
        success: false,
      };
  };

  //로그인
  //정확한 email, password를 입력시 return {token, success : true}
  //그렇지 않으면  return {success : false, msg : "회원 정보가 일치하지 않습니다."}

  login = async (email, password, nickname, userId) => {
    const userData = await this.authRepository.loginUser(
      email,
      password,
      nickname,
      userId
    );
    console.log("service", userData);

    const token = jwt.sign(
      {
        userId: userData.loginUserData[0].userId,
        nickname: userData.loginNicknameData.nickname,
      },
      env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    return {
      msg: "로그인 되었습니다.",
      status: 200,
      success: true,
      token,
      userId: userData.loginUserData[0].userId,
      nickname: userData.loginNicknameData,
    };
  };

  //이메일
  //중복 이메일 확인 : 데이터베이스에 중복된 이메일이 있는지 확인
  checkDupEmail = async (email) => {
    const checkDupEmailData = await this.authRepository.checkDupEmail(email);
    if (checkDupEmailData) {
      return {
        success: false,
        msg: "이미 존재하는 이메일입니다.",
      };
    } else
      return {
        success: true,
        msg: "사용할 수 있는 이메일입니다.",
      };
  };

  //이메일 유효성 검사
  checkEmailEffectiveness = async (email) => {
    const schema = Joi.object().keys({
      email: Joi.string().email().max(29).required(),
    });
    try {
      // 검사시작
      await schema.validateAsync({ email });
    } catch (e) {
      // 유효성 검사 에러
      return {
        msg: "이메일을 확인하세요.",
        success: false,
      };
    }
    return { success: true };
  };

  //닉네임 유효성 검사
  checkNicknameEffectiveness = async (nickname) => {
    const schema = Joi.object().keys({
      nickname: Joi.string()
        .min(2)
        .max(19)
        .pattern(new RegExp(/^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9]+$/))
        .required(),
    });
    try {
      await schema.validateAsync({ nickname });
    } catch (e) {
      {
        return { msg: "닉네임을 확인하세요.", err: e, success: false };
      }
    }

    //중복 닉네임 확인 : 데이터베이스에 중복된 닉네임이 있는지 확인
    checkDupNickname = async (nickname) => {
      const checkDupNicknameData = await this.authRepository.checkDupNickname(
        nickname
      );
      if (checkDupNicknameData) {
        return { msg: "사용할 수 있는 닉네임입니다.", success: true };
      } else return { msg: "이미 존재하는 닉네임입니다.", success: false };
    };
  };

  //비밀번호 유효성 검사
  checkPasswordEffectiveness = async (password) => {
    const schema = Joi.object().keys({
      //   email: Joi.string().email().max(29).required(),
      password: Joi.string()
        .min(6)
        .max(19)
        .pattern(
          new RegExp(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
          )
        )
        .required(),
    });
    try {
      // 검사시작
      await schema.validateAsync({ password: password });
    } catch (e) {
      // 유효성 검사 에러
      return {
        status: 400,
        msg: "비밀번호를 확인하세요.",
        success: false,
      };
    }
    if (password.search(email) > -1) {
      return {
        msg: "이메일에 비밀번호가 포함됩니다.",
        success: false,
      };
    }
    return { success: true };
  };
};

//   deleteUser = async (userId) => {
//     await this.signRepository.deleteUser(userId);
//     return {
//       success: true,
//       msg: "서운해요..",
//     };
//   }
