const { condition } = require("sequelize");
const { User, Dislike, Like } = require("../../models");

module.exports = class Authrepository {
  //새로운 유저테이블 생성, 생성한 유저의 정보 반환.
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
    const createUserData = await User.create({
      email,
      password,
      confirm,
      nickname,
      age,
      address,
      gender,
      interest: interest.join(""),
      // interest,
      imageUrl,
    });
    return createUserData;
  };

  loginUser = async (email, password, nickname, userId) => {
    const loginUserData = await User.findAll({
      where: { email, password },
      raw: true,
    });

    if (!loginUserData) {
      res.status(400).send({
        errorMessage: "이메일 또는 패스워드가 잘못됐습니다.",
      });
    }
    // console.log(loginUserData);
    const loginNicknameData = loginUserData.map((row) => row.nickname);
    // console.log("repo", loginNicknameData);
    const loginData = { loginNicknameData, loginUserData };
    return loginData;
  };

  //유저 아이디로 해당 유저의 row 반환.
  returnUserStatus = async (userId) => {
    const userStatusData = await User.findOne({
      where: { userId },
    });
    return userStatusData;
  };

  //email을 인자로 받아 중복된 이메일이 있다면 그 row 반환
  checkDupEmail = async (email) => {
    const dupEmailData = await User.findOne({
      where: { email },
    });
    return dupEmailData;
  };

  //nickname 인자로 받아 중복된 닉네임이 있다면 그 row 반환
  checkDupNickname = async (nickname) => {
    const dupNicknameData = await User.findOne({
      where: { nickname },
    });
    console.log(dupNicknameData);
    return dupNicknameData;
  };

  //email을 인자로 받아 해당되는 패스워드 반환
  findEmailToPassword = async (email) => {
    const findPassword = await User.findOne({
      where: { email },
    });
    return findPassword;
  };

  //userId로 유저를 찾아 그 유저의 정보 변경.
  // updateUserProfile = async (userId, password, nickname) => {
  //   const updataUserProfileData = await User.update(
  //     {
  //       password,
  //       nickname,
  //       imageUrl,
  //     },
  //     { where: { userId } }
  //   );
  //   return updataUserProfileData;
  // };

  //userId로 해당 유저를 삭제.
  // deleteUser = async (userId) => {
  //   await User.delete({
  //     where: { userId },
  //   });
  //   return { success: true };
  // };
  // returnUserLikeOrNot = async (userId, postId) => {
  //   const data = await Like.findOne({
  //     where: { userId, postId },
  //   });
  //   return data;
  // };
};

// module.exports = Authrepository;
