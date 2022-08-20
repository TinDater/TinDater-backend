const { User, Like, Dislike } = require("../../models");
const peopleRouter = require("../routers/people.router");
const { Op } = require("sequelize");

module.exports = class PeopleRepository {
  /**
   * 다음 추천받을 사람id 랜덤으로 얻기. (나, 내가 좋아요, 싫어요 누른 사람 제외)
   * @param {*} userId
   * @returns
   */
  getRecommend = async (userId) => {
    try {
      const people = await User.findAll({
        attributes: ["userId"],
        raw: true,
      });
      let peopleset = new Set();
      people.map((data) => peopleset.add(data.userId));

      const likepeople = await Like.findAll({
        attributes: ["likeUserId"],
        where: { userId: userId },
        raw: true,
      });
      let likeset = new Set();
      likepeople.map((data) => likeset.add(data.likeUserId));

      const dislikepeople = await Dislike.findAll({
        attributes: ["dislikeUserId"],
        where: { userId: userId },
        raw: true,
      });
      let dislikeset = new Set();
      dislikepeople.map((data) => dislikeset.add(data.dislikeUserId));

      peopleset.delete(+userId);
      likeset.forEach((v) => peopleset.delete(v));
      dislikeset.forEach((v) => peopleset.delete(v));
      //console.log(peopleset, peopleset.size);
      const random = Math.floor(Math.random() * peopleset.size);

      const result = [...peopleset][random];
      //console.log(random, result);
      return result;
    } catch (err) {
      console.error(err);
      return err.message;
    }
  };
  /**
   * 해당 유저id로 스와이프. like와 join해서 이사람이 날 좋아요 눌렀는지도 얻어야함.
   * @param {*} userId
   * @returns
   */
  getSwipe = async (userId, recommended) => {
    try {
      const people = await User.findOne({
        where: { userId: recommended },
        include: [
          {
            model: Like,
            where: {
              [Op.and]: [{ userId: recommended }, { likeUserId: userId }],
            },
          },
        ],
      });
      return people;
    } catch (err) {
      console.error(err);
      return err.message;
    }
  };
  createLike = async (userId, likeUserId) => {
    try {
      const people = await Like.create({
        userId: userId,
        likeUserId: likeUserId,
      });
      return people;
    } catch (err) {
      console.error(err);
      return err.message;
    }
  };
  createDislike = async (userId, likeUserId) => {
    try {
      const people = await Dislike.create({
        userId: userId,
        likeUserId: likeUserId,
      });
      return people;
    } catch (err) {
      console.error(err.message);
      return err.message;
    }
  };
};
