const AuthMiddleware = require("../../middlewares/authmiddleware");
const AuthRepository = require("../repositories/auth.repository");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { token } = require("morgan");
const { nextTick } = require("process");
require("dotenv").config();
const env = process.env;

module.exports = class AuthService {
  authRepository = new AuthRepository();

  //회원가입 : email, password,,, 유저 데이터베이스에 추가
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
    //비밀번호 유효성 검사
    const passwordEffectiveness = Joi.object().keys({
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
      await passwordEffectiveness.validateAsync({ password: password });
    } catch (e) {
      return {
        err: e,
        msg: "비밀번호를 확인하세요.",
        success: false,
      };
    }
    //이메일 유효성 검사
    const checkEmailEffectiveness = Joi.object().keys({
      email: Joi.string().email().max(29).required("@"),
    });
    try {
      await checkEmailEffectiveness.validateAsync({ email });
    } catch (e) {
      return {
        msg: "이메일을 확인하세요.",
        err: e,
        success: false,
      };
    }
    const checkDupemailnameData = await this.authRepository.checkDupEmail(
      email
    );
    if (checkDupemailnameData) {
      return { msg: "이미 존재하는 이메일입니다.", success: false };
    }

    //닉네임 유효성 검사
    const checkNicknameEffectiveness = Joi.object().keys({
      nickname: Joi.string()
        .min(2)
        .max(19)
        .pattern(new RegExp(/^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9]+$/))
        .required(),
    });
    try {
      await checkNicknameEffectiveness.validateAsync({ nickname });
    } catch (e) {
      {
        return { msg: "닉네임을 확인하세요.", err: e, success: false };
      }
    }

    const checkDupNicknameData = await this.authRepository.checkDupNickname(
      nickname
    );
    if (checkDupNicknameData) {
      return { msg: "이미 존재하는 닉네임입니다.", success: false };
    }

    const hashPassword = crypto
      .createHash("sha512")
      .update(password)
      .digest("hex");

    const createUserData = await this.authRepository.createUser(
      email,
      hashPassword,
      //   password,
      confirm,
      nickname,
      age,
      address,
      gender,
      interest,
      imageUrl
    );
    if (createUserData) {
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
  login = async (email, password, nickname, userId) => {
    const hashPassword = crypto
      .createHash("sha512")
      .update(password)
      .digest("hex");

    if (!hashPassword) {
      return {
        status: 400,
        sucess: false,
        msg: "이메일 또는 비밀번호를 확인해주세요",
      };
    }

    console.log("service 해시password", hashPassword);

    const userData = await this.authRepository.loginUser(
      email,
      hashPassword,
      //   password,
      nickname,
      userId
    );
    console.log("service userDatav", userData);
    const token = jwt.sign(
      {
        userId: userData.loginUserData[0].userId,
        // userId: userData.userId,
        nickname: userData.loginNicknameData[0],
      },

      env.ACCESS_SECRET,
      { expiresIn: env.ACCESS_OPTION_EXPIRESIN }
    );

    console.log("service token", token);
    console.log("service userdata", userData);

    return {
      msg: "로그인 되었습니다.",
      status: 200,
      success: true,
      token,
      userId: userData.loginUserData[0].userId,
      nickname: userData.loginNicknameData,
    };
  };

  //이메일 유효성 검사
  checkEmailEffectiveness = async (email) => {
    const schema = Joi.object().keys({
      email: Joi.string().email().max(29).required("@"),
    });

    const checkDupEmailData = await this.authRepository.checkDupEmail(email);
    if (checkDupEmailData) {
      return {
        data: checkDupEmailData,
        success: false,
        msg: "이미 존재하는 이메일입니다.",
      };
    } else
      return {
        data: checkDupEmailData,
        success: true,
        msg: "사용할 수 있는 이메일입니다.",
      };
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
      console.log(e);
      {
        return { msg: "닉네임을 확인하세요.", err: e, success: false };
      }
    }

    //중복 닉네임 확인 : 데이터베이스에 중복된 닉네임이 있는지 확인
    //   checkDupNickname = async (nickname) => {
    const checkDupNicknameData = await this.authRepository.checkDupNickname(
      nickname
    );
    if (!checkDupNicknameData) {
      return { msg: "사용할 수 있는 닉네임입니다.", success: true };
    } else return { msg: "이미 존재하는 닉네임입니다.", success: false };
  };
};
