const express = require("express");
const peopleRouter = express.Router();

const PeopleController = require("../controllers/people.controller.js");
const peopleController = new PeopleController();

//내가 좋아요한 사람
peopleRouter.get("/like", peopleController.likePeople);

//스와이프 페이지
peopleRouter.get("/:userId", peopleController.getSwipe);

peopleRouter
  .route("/:userId/like")
  .post(peopleController.likeSwipe) //좋아요 (스와이프)
  .get(peopleController.likePeople); //내가 좋아요 누른 사람 목록

//싫어요 (스와이프)
peopleRouter.post("/:userId/dislike", peopleController.dislikeSwipe);

module.exports = peopleRouter;
