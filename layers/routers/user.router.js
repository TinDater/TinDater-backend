const express = require("express");
const userRouter = express.Router();

const UserController = require("../controllers/user.controller");
const userController = new UserController();

userRouter.get("/:userId", userController.getMypage);
userRouter.put("/:userId", userController.updateMypage);
userRouter.patch("/:userId/coord", userController.updateCoord);

module.exports = userRouter;
