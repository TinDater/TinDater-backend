const { arrayBuffer } = require("stream/consumers");
const joi = require("joi");

const UserService = require("../services/user.service");
const { string } = require("yargs");

class UserController {
  userService = new UserService();

  //이미지 파일 수정
  deleteImage = async (req, res, next) => {
    try {
      const userId = req.params.userId;
      const { imageUrl } = req.body;

      await joi
        .object({
          userId: joi.number().required(),
          imageUrl: joi.string().required(),
        })
        .validateAsync({ imageUrl, userId });
      console.log("dddd");
      const result = await this.userService.updateMypage({ userId, imageUrl });
      if (result.success) {
        return res
          .status(200)
          .json({ sucess: true, msg: "업데이트가 성공하였습니다." });
      } else {
        return res
          .status(result.status)
          .send({ success: false, msg: result.msg });
      }
    } catch (err) {
      console.log(err);
      return res.status(400).json({ success: false, msg: err.message });
    }
  };

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
    const userData = { ...req.params, ...req.body };
    try {
      //비밀번호 일치 확인
      if (
        userData.password !== undefined &&
        userData.password !== userData.confirm
      ) {
        return res.status(400).send({
          msg: "패스워드가 패스워드 확인란과 동일하지 않습니다.",
          success: false,
        });
      }

      const updateMypageData = await this.userService.updateMypage(userData);

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
    } catch (err) {
      console.log(err);
      return res.status(400).json({ success: false, msg: err.message });
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
