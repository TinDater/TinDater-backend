//const { User } = require("../../models");

class UserRepository {
  //마이 페이지 확인
  getMypage = async (userId) => {
    const getMypageData = await User.findOne({
      where: {
        userId,
      },
    });

    return { getMypageData };
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
    interests
  ) => {
    const updateMypageData = await User.update(
      {
        email,
        nickname,
        age,
        address,
        gender,
        imageUrl,
        interests,
      },
      {
        where: {
          userId,
        },
      }
    );

    return updateMypageData;
  };
}

module.exports = UserRepository;
