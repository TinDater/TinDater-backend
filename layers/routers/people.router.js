const express = require("express");
const peopleRouter = express.Router();

const authMiddleware = require("../../middlewares/authmiddleware");

const AuthController = require("../controllers/auth.controller");

const PeopleController = require("../controllers/people.controller.js");
const peopleController = new PeopleController();

//내가 좋아요한 사람
peopleRouter.get("/like", authMiddleware, peopleController.likePeople);

//추천받기 첫페이지
peopleRouter.get("/:userId", authMiddleware, peopleController.getRecommend);

peopleRouter
  .route("/:userId/like")
  .post(authMiddleware, peopleController.likeSwipe) //좋아요 (스와이프)
  .get(authMiddleware, peopleController.likePeople); //내가 좋아요 누른 사람 목록

//싫어요 (스와이프)
peopleRouter.post(
  "/:userId/dislike",
  authMiddleware,
  peopleController.dislikeSwipe
);

module.exports = peopleRouter;
