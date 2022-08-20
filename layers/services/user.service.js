const UserRepository = require("../repositories/user.repository");

class UserService {
  userRepository = new UserRepository();

  //마이 페이지 확인
  getMypage = async (userId) => {
    const getMypageData = await this.userRepository.getMypage(userId);

    if (!getMypageData) {
      return {
        success: false,
        status: 400,
        message: "userId가 존재하지 않습니다.",
      };
    }

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
    const existUserId = await this.userRepository.existUserId(userId);

    if (!existUserId) {
      return {
        success: false,
        status: 400,
        message: "userId가 존재하지 않습니다.",
      };
    }

    const updateMypageData = await this.userRepository.updateMypage(
      userId,
      email,
      nickname,
      age,
      address,
      gender,
      imageUrl,
      interest
    );

    return { success: true, updateMypageData };
  };

  //내가 좋아요한 사람//user->people로 바꾸기
  peopleIlike = async (userId) => {
    const peopleIlike = await this.userRepository.peopleIlike(userId);

    return peopleIlike;
  };
}

module.exports = UserService;
