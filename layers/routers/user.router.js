const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user.controller");
const userController = new UserController();

router.get("/:userId", userController.getMypage);
router.put("/:userId", userController.updateMypage);
router.post("/:userId/image", userController.uploadImg);
