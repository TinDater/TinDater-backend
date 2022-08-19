const express = require("express");
const router = express.Router();

const PeopleController = require("../controllers/people.controller");
const peopleController = new PeopleController();

router.get("/", peopleController.getSwipe);
