const { User, Like } = require("../../models");

class UserRepository {
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

  //마이 페이지 수정
  updateMypage = async (
    userId,
    email,
    nickname,
    age,
    address,
    gender,
    imageUrl,
    interest
  ) => {
    const findUserId = await User.findOne({
      raw: true,
      where: {
        userId,
      },
    });

    if (!findUserId) throw new Error("userId를 찾을 수 없습니다.");

    const updateMypageData = await User.update(
      {
        email,
        nickname,
        age,
        address,
        gender,
        imageUrl,
        interest,
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
}

module.exports = UserRepository;
