const express = require("express");
const peopleRouter = express.Router();

const PeopleController = require("../controllers/people.controller.js");
const peopleController = new PeopleController();

//스와이프 페이지
peopleRouter.get("", peopleController.getSwipe);

//좋아요 (스와이프)
peopleRouter.post("/:userId/like", peopleController.likeSwipe);

//싫어요 (스와이프)
peopleRouter.post("/:userId/dislike", peopleController.dislikeSwipe);

//내가 좋아요한 사람
peopleRouter.get("/like", peopleController.likepeople);

module.exports = peopleRouter;
