const res = require("express/lib/response");
const { User } = require("../../models");

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
}

module.exports = UserRepository;
