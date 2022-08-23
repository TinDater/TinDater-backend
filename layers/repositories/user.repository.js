const { User, Like } = require("../../models");

module.exports = class UserRepository {
  //마이 페이지 확인
  getMypage = async (userId) => {
    const getMypageData = await User.findOne({
      raw: true,
      where: {
        userId,
      },
    });

    return getMypageData;
  };

  existUserId = async (userId) => {
    const existUserId = await User.findOne({
      raw: true,
      where: {
        userId,
      },
    });
    return existUserId;
  };

  //nickname 인자로 받아 중복된 닉네임이 있다면 그 row 반환
  checkDupNickname = async (nickname) => {
    const dupNicknameData = await User.findOne({
      where: { nickname },
    });
    return dupNicknameData;
  };

  //마이 페이지 수정
  updateMypage = async (
    userId,
    email,
    hashPassword,
    nickname,
    age,
    address,
    gender,
    imageUrl,
    interest
  ) => {
    const updateMypageData = await User.update(
      {
        email: email,
        password: hashPassword,
        nickname: nickname,
        age: age,
        address: address,
        gender: gender,
        imageUrl: imageUrl,
        interest: interest.join(""),
      },
      {
        raw: true,
        where: {
          userId,
        },
      }
    );

    return updateMypageData;
  };

  updateCoord = async (userId, x, y) => {
    const updateCoordData = await User.update(
      { x: x, y: y },
      { where: { userId } }
    );
    return updateCoordData;
  };
};
