const UserService = require("../services/user.service");

class UserController {
  userService = new UserService();

  //마이 페이지 확인
  getMypage = async (req, res, next) => {
    const { userId } = req.params;
    const getMypageData = await this.userService.getMypage(userId);

    if (getMypageData.success) {
      return res.status(200).json({ data: getMypageData });
    } else {
      return res.status(getMypageData.status).json(getMypageData.message);
    }
  };

  //마이 페이지 수정
  updateMypage = async (req, res, next) => {
    const { userId } = req.params;
    const { email, nickname, age, address, gender, imageUrl, interest } =
      req.body;

    if (
      !email &&
      !nickname &&
      !age &&
      !address &&
      !gender &&
      !imageUrl &&
      !interest
    )
      return res
        .status(400)
        .json({ errorMessage: "데이터 형식을 확인해주세요." });

    const updateMypageData = await this.userService.updateMypage(
      userId,
      email,
      nickname,
      age,
      address,
      gender,
      imageUrl,
      interest
    );
    //success is true
    if (updateMypageData.success) {
      return res.status(200).json({ msg: "업데이트가 성공하였습니다." });
    } else {
      return res.status(updateMypageData.status).json(updateMypageData.message);
    }
  };

  //내가 좋아요한 사람//user->people로 바꾸기
  peopleIlike = async (req, res, next) => {
    const { userId } = req.params;
    //const { userId } = res.locals.userId;
    const peopleIlikeData = await this.userService.peopleIlike(userId);

    res.status(200).json({ data: peopleIlikeData });
  };
}

module.exports = UserController;
