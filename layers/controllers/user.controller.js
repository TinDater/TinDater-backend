const UserService = require("../services/user.service");

class UserController {
  userService = new UserService();

  //마이 페이지 확인
  getMypage = async (req, res, next) => {
    const { userId } = req.params;
    const getMypageData = await this.userService.getMypage(userId);
    if (getMypageData.success !== false) {
      return res.status(200).json({ success: true, data: getMypageData });
    } else {
      return res
        .status(getMypageData.status)
        .json({ success: false, msg: getMypageData.msg });
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
        .json({ success: false, msg: "데이터 형식을 확인해주세요." });

    //비밀번호 일치 확인
    if (password !== confirm) {
      res.status(400).send({
        msg: "패스워드가 패스워드 확인란과 동일하지 않습니다.",
        success: false,
      });
      return;
    }

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
      return res
        .status(200)
        .json({ sucess: true, msg: "업데이트가 성공하였습니다." });
    } else {
      return res
        .status(updateMypageData.status)
        .send({ success: false, msg: updateMypageData.msg });
    }
  };

  //유저 위치 정보 업데이트
  updateCoord = async (req, res, next) => {
    const { userId } = req.params;
    const { x, y } = req.body;

    const updateCoordData = await this.userService.updateCoord(userId, x, y);
    console.log(updateCoordData);
    if (updateCoordData.success === true) {
      return res
        .status(200)
        .json({ sucess: true, msg: "업데이트가 성공하였습니다." });
    } else {
      return res
        .status(updateCoordData.status)
        .send({ success: false, msg: updateCoordData.msg });
    }
  };
}

module.exports = UserController;
