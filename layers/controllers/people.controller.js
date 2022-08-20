const PeopleService = require("../services/people.service");

module.exports = class PeopleController {
  peopleService = new PeopleService();

  getSwipe = async (req, res, next) => {};

  likeSwipe = async (req, res, next) => {};

  dislikeSwipe = async (req, res, next) => {};

  likepeople = async (req, res, next) => {};
};
