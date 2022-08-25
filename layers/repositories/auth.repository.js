const { condition } = require("sequelize");
const { User, Dislike, Like } = require("../../models");

module.exports = class Authrepository {
  getImageUrl = async (userId) => {
    return User.findOne({
      where: userId,
      attributes: ["imageUrl"],
    });
  };

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

  //로그인시 입력한 email, password 값으로 nickname과 userdata 반환
  loginUser = async (email, password) => {
    const loginUserData = await User.findOne({
      where: { email },
      raw: true,
    });
    // const loginNicknameData = loginUserData.map((row) => row.nickname); //닉네임만 뽑아온다.
    const loginNicknameData = loginUserData.nickname;
    const loginUserIdData = loginUserData.userId;
    const loginEmailData = loginUserData.email;
    const loginUserImageUrl = loginUserData.imageUrl;
    const loginData = {
      loginNicknameData,
      loginEmailData,
      loginUserIdData,
      loginUserImageUrl,
    }; //해당 유저의 모든 정보

    return loginData;
  };

  //email, nickname 값 받아서 등록 안된 닉네임일 경우 에러
  isExistUser = async (email) => {
    const isExistUserData = await User.findOne({
      where: { email },
      raw: true,
    });
    console.log(isExistUserData);
    return isExistUserData;
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
    console.log("dupEmailData", dupEmailData);
    return dupEmailData;
  };

  //nickname 인자로 받아 중복된 닉네임이 있다면 그 row 반환
  checkDupNickname = async (nickname) => {
    const dupNicknameData = await User.findOne({
      where: { nickname },
    });
    console.log("dupnickname", dupNicknameData);

    return dupNicknameData;
  };

  //email을 인자로 받아 해당되는 패스워드 반환
  findEmailToPassword = async (email) => {
    const findPassword = await User.findOne({
      where: { email },
    });
    return findPassword;
  };
};
