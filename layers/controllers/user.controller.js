const UserService = require("../services/user.service");

class UserController {
  userService = new UserService();

  //마이 페이지 확인
  getMypage = async (req, res, next) => {
    const { userId } = req.params;
    const getMypageData = await this.userService.getMypage(userId);

    if (getMypageData) {
      return res.status(200).json({ data: getMypageData });
    } else {
      return res.status(getMypageData.status).json(getMypageData.message);
    }
  };

  //마이 페이지 수정
  updateMypage = async (req, res, next) => {
    const { userId } = req.params;
    const {
      email,
      password,
      confirm,
      nickname,
      age,
      address,
      gender,
      imageUrl,
      interest,
    } = req.body;

    if (
      !email &&
      !password &&
      !confirm &&
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

    //비밀번호 일치 확인
    if (password !== confirm) {
      res.status(400).send({
        msg: "패스워드가 패스워드 확인란과 동일하지 않습니다.",
        success: false,
      });
      return;
    }
    console.log(email, "con");
    console.log(nickname, "con2nick");
    const updateMypageData = await this.userService.updateMypage(
      userId,
      password,
      confirm,
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
      console.log(updateMypageData);
      return res.status(updateMypageData.status).json(updateMypageData.message);
    }
  };

  //내가 좋아요한 사람//user->people로 바꾸기
  peopleIlike = async (req, res, next) => {
    const { userId } = req.params;
    const peopleIlikeData = await this.userService.peopleIlike(userId);

    res.status(200).json({ data: peopleIlikeData });
  };
}

module.exports = UserController;
