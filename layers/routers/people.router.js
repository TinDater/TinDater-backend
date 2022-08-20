const express = require("express");
const peopleRouter = express.Router();

const PeopleController = require("../controllers/people.controller.js");
const peopleController = new PeopleController();

peopleRouter.get("", peopleController.getSwipe);
peopleRouter.post("/:userId/like", peopleController.likeSwipe);
peopleRouter.post("/:userId/dislike", peopleController.dislikeSwipe);
peopleRouter.get("/like", peopleController.likepeople);

module.exports = peopleRouter;
