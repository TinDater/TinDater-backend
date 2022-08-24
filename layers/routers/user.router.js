const express = require("express");
const userRouter = express.Router();

const authMiddleware = require("../../middlewares/authmiddleware");
const deleteImage = require("../../middlewares/s3deleteimage.middleware");
const UserController = require("../controllers/user.controller");
const userController = new UserController();

//이미지 수정
userRouter.patch(
  "/:userId/image",
  authMiddleware,
  deleteImage,
  userController.deleteImage
);
userRouter
  .route("/:userId")
  .get(authMiddleware, userController.getMypage) //마이페이지 조회
  .patch(authMiddleware, userController.updateMypage); //마이페이지 수정
userRouter.patch("/:userId/coord", authMiddleware, userController.updateCoord); //위치정보 수정

module.exports = userRouter;
