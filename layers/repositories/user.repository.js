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
    console.log(email);
    const updateMypageData = await User.update(
      {
        email: email,
        password: hashPassword,
        nickname: nickname,
        age: age,
        address: address,
        gender: gender,
        imageUrl: imageUrl,
        interest: interest,
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

  //내가 좋아요한 사람//user->people로 바꾸기
  peopleIlike = async (userId) => {
    //로그인한 유저의 userId가 좋아요한 likeUserId의 배열
    const peopleIlike = await Like.findAll({
      where: {
        userId,
      },
      attributes: ["likeUserId"],
      raw: true,
    });
    console.log(peopleIlike);
    let userList = [];

    for (const entity of peopleIlike) {
      const userId = entity.likeUserId;
      const userInfo = await User.findOne({ where: { userId }, raw: true });
      userList.push(userInfo);
    }
    return userList;
  };
};
