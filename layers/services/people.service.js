const PeopleRepository = require("../repositories/people.repository");

module.exports = class PeopleService {
  peopleRepository = new PeopleRepository();

  getSwipe = async (userId) => {
    try {
      const recommended = await this.peopleRepository.getRecommend(userId);
      const people = await this.peopleRepository.getSwipe(userId, recommended);
      return people;
    } catch (err) {
      console.error(err);
      return err.message;
    }
  };

  likeSwipe = async (userId, likeUserId) => {
    try {
      const createLike = await this.peopleRepository.createLike(
        userId,
        likeUserId
      );
      const people = await this.peopleRepository.getSwipe();
      return people;
    } catch (err) {
      console.error(err);
    }
  };

  dislikeSwipe = async (req, res, next) => {
    try {
      const createDislike = await this.peopleRepository.createDislike(
        userId,
        likeUserId
      );
      const people = await this.peopleRepository.getSwipe();
      return people;
    } catch (err) {
      console.error(err.message);
    }
  };

  likePeople = async (req, res, next) => {
    try {
    } catch (err) {
      console.error(err.message);
    }
  };
};
