const joi = require("joi");
const { join } = require("path");
const PeopleService = require("../services/people.service");

module.exports = class PeopleController {
  peopleService = new PeopleService();

  /**userId는 현재 로그인한 사용자.
   *
   */
  getSwipe = async (req, res, next) => {
    const { userId } = req.params;
    try {
      await joi
        .object({
          userId: joi.number().required(),
        })
        .validateAsync({ userId });
      const people = await this.peopleService.getSwipe(userId);

      return res.json({ success: true, ...people });
    } catch (err) {
      console.error(err.message);
      return res.json(err.message);
    }
  };

  likeSwipe = async (req, res, next) => {
    const { userId } = req.params;
    const { likeUserId } = req.body;

    try {
      await joi
        .object({
          userId: joi.number().required(),
          likeUserId: joi.number().required(),
        })
        .validateAsync({ userId, likeUserId });
      const people = await this.peopleService.likeSwipe(userId, likeUserId);
      if (people === null) return res.status(400).json({ success: false });
      else return res.status(201).json({ success: true, data: { ...people } });
    } catch (err) {
      console.error(err.message);
      return res.status(400).json(err.message);
    }
  };

  dislikeSwipe = async (req, res, next) => {
    const { userId } = req.params;
    const { dislikeUserId } = req.body;

    try {
      await joi
        .object({
          userId: joi.number().required(),
          dislikeUserId: joi.number().required(),
        })
        .validateAsync({ userId, dislikeUserId });
      const people = await this.peopleService.dislikeSwipe(
        userId,
        dislikeUserId
      );
      if (people === null) return res.status(400).json({ success: false });
      else return res.status(201).json({ success: true, data: { ...people } });
    } catch (err) {
      console.error(err.message);
      return res.json(err.message);
    }
  };

  likePeople = async (req, res, next) => {
    const { userId } = req.params;
    try {
      const people = await this.peopleService.likePeople(userId);
      if (people === null) return res.status(400).json({ success: false });
      else return res.status(201).json({ success: true, data: { ...people } });
    } catch (err) {
      console.error(err.message);
      return res.json(err.message);
    }
  };
};
