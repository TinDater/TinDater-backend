const PeopleRepository = require("../repositories/people.repository");

module.exports = class PeopleService {
  peopleRepository = new PeopleRepository();

  getSwipe = async (req, res, next) => {};

  likeSwipe = async (req, res, next) => {};

  dislikeSwipe = async (req, res, next) => {};

  likepeople = async (req, res, next) => {};
};
