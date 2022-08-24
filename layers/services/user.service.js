const Joi = require("joi");
const crypto = require("crypto");

const UserRepository = require("../repositories/user.repository");

class UserService {
  userRepository = new UserRepository();

  //마이 페이지 확인
  getMypage = async (userId) => {
    const getMypageData = await this.userRepository.getMypage(userId);
    let result;
    if (!getMypageData) {
      return {
        success: false,
        status: 400,
        msg: "userId가 존재하지 않습니다.",
      };
    } else {
      result = {
        userId: getMypageData.userId,
        email: getMypageData.email,
        nickname: getMypageData.nickname,
        age: getMypageData.age,
        address: getMypageData.address,
        gender: getMypageData.gender,
        imageUrl: getMypageData.imageUrl,
        interest: getMypageData.interest.split(""),
        x: getMypageData.x,
        y: getMypageData.y,
        likeMe: getMypageData.likeMe,
      };
    }

    return result;
  };

  //마이 페이지 수정
  updateMypage = async (userData) => {
    const existUserId = await this.userRepository.existUserId(userData.userId);
    if (!existUserId) {
      return {
        success: false,
        status: 400,
        msg: "userId가 존재하지 않습니다.",
      };
    }

    //닉네임 유효성 검사
    if (userData.nickname) {
      const schema = Joi.object().keys({
        nickname: Joi.string()
          .min(2)
          .max(19)
          .pattern(new RegExp(/^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9]+$/))
          .required(),
      });

      try {
        await schema.validateAsync({ nickname: userData.nickname });
      } catch (e) {
        console.log(e);
        return { msg: "닉네임을 확인하세요.", status: 400, success: false };
      }

      //중복 닉네임 확인
      const checkDupNicknameData = await this.userRepository.checkDupNickname(
        userData.nickname
      );

      if (checkDupNicknameData) {
        return {
          msg: "이미 존재하는 닉네임입니다.",
          status: 400,
          success: false,
        };
      }
    }

    //비밀번호 유효성 검사
    if (userData.password) {
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
        await passwordEffectiveness.validateAsync({
          password: userData.password,
        });
      } catch (e) {
        return {
          err: e,
          status: 400,
          msg: "비밀번호를 확인하세요.",
          success: false,
        };
      }

      const hashPassword = crypto
        .createHash("sha512")
        .update(userData.password)
        .digest("hex");
      userData.password = hashPassword;
    }

    const updateMypageData = await this.userRepository.updateMypage(userData);

    return { success: true, updateMypageData };
  };

  updateCoord = async (userId, x, y) => {
    const existUserId = await this.userRepository.existUserId(userId);
    if (!existUserId) {
      return {
        success: false,
        status: 400,
        msg: "userId가 존재하지 않습니다.",
      };
    }

    const updateCoordData = await this.userRepository.updateCoord(userId, x, y);

    return { success: true, updateCoordData };
  };
}

module.exports = UserService;
