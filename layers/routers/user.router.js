const express = require("express");
const userRouter = express.Router();

const authMiddleware = require("../../middlewares/authmiddleware");

const UserController = require("../controllers/user.controller");
const userController = new UserController();

userRouter.get("/:userId", authMiddleware, userController.getMypage);
userRouter.patch("/:userId", authMiddleware, userController.updateMypage);
userRouter.patch("/:userId/coord", authMiddleware, userController.updateCoord);

module.exports = userRouter;
