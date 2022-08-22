const UserRepository = require("../repositories/user.repository");

class UserService {
  userRepository = new UserRepository();

  //마이 페이지 확인
  getMypage = async (userId) => {
    const getMypageData = await this.userRepository.getMypage(userId);
    let result;

    if (!getMypageData) throw new Error("userId를 찾을 수 없습니다.");
    else {
      result = {
        userId: getMypageData.userId,
        email: getMypageData.email,
        nickname: getMypageData.nickname,
        age: getMypageData.age,
        address: getMypageData.address,
        gender: getMypageData.gender,
        imageUrl: getMypageData.imageUrl,
        interest: getMypageData.interest.split(""),
        likeMe: getMypageData.likeMe,
      };
    }

    return result;
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

    return updateMypageData;
  };

  //내가 좋아요한 사람//user->people로 바꾸기
  peopleIlike = async (userId) => {
    const peopleIlike = await this.userRepository.peopleIlike(userId);
    console.log("222222");
    return peopleIlike;
  };
}

module.exports = UserService;
