const { User, LikeAndDislike } = require("../../models");
const peopleRouter = require("../routers/people.router");
const { Op } = require("sequelize");

module.exports = class PeopleRepository {
  /**
   * 다음 추천받을 사람id 랜덤으로 얻기. (나, 내가 좋아요, 싫어요 누른 사람 제외)
   * @param {*} userId
   * @returns
   */
  RecommendOne = async (userId) => {
    try {
      const people = await User.findAll({
        attributes: ["userId"],
        raw: true,
      });
      let peopleSet = new Set();
      people.map((data) => peopleSet.add(data.userId));

      const ignoredPeople = await LikeAndDislike.findAll({
        attributes: ["targetUserId"],
        where: { userId: userId },
        raw: true,
      });
      let ignoredSet = new Set();
      ignoredPeople.map((data) => ignoredSet.add(data.targetUserId));

      peopleSet.delete(+userId);
      ignoredSet.forEach((v) => peopleSet.delete(v));
      //console.log(peopleSet, peopleSet.size);
      const random = Math.floor(Math.random() * peopleSet.size);

      const result = [...peopleSet][random];
      //console.log(random, result);
      if (result === undefined) return null;
      return result;
    } catch (err) {
      console.error(err);
      return err.message;
    }
  };

  /**
   *
   * @param {*} userId
   * @param {*} recommended
   * @returns
   */
  getIsLikeMe = async (userId, recommended) => {
    try {
      const isLikeMe = await LikeAndDislike.findOne({
        where: { userId: recommended, targetUserId: userId, isLike: true },
      });
      return { success: true, isLikeMe: isLikeMe ? true : false };
    } catch (err) {
      console.error(err);
      return { success: false, msg: err.message };
    }
  };
  /**
   * 해당 유저id로 스와이프. like와 join해서 이사람이 날 좋아요 눌렀는지도 얻어야함.
   * @param {*} userId
   * @returns
   */
  getRecommend = async (userId, recommended) => {
    try {
      const people = await User.findOne({
        where: { userId: recommended },
      });
      const isLikeMe = await this.getIsLikeMe(userId, recommended);
      if (isLikeMe.success === true)
        return {
          success: true,
          ...people.dataValues,
          likeMe: isLikeMe.isLikeMe,
        };
      else throw new Error(isLikeMe.msg);
    } catch (err) {
      console.error(err);
      return { success: false, msg: err.message };
    }
  };

  getIsEstimated = async (userId, targetUserId) => {
    const isEstimated = await LikeAndDislike.findOne({
      where: { userId, targetUserId },
    });
    if (isEstimated) return true;
    else return false;
  };
  /**
   * 이 사람에게 좋아요 누르기
   * @param {*} userId
   * @param {*} likeUserId
   * @returns
   */
  createLike = async (userId, likeUserId) => {
    try {
      //없는 사용자를 평가하려고하면 constraint에 의해 쿼리문에서 자동으로 에러 호출.
      const people = await LikeAndDislike.create({
        userId: userId,
        targetUserId: likeUserId,
        isLike: true,
      });

      return people;
    } catch (err) {
      console.error(err);
      return err.message;
    }
  };
  /**이 사람에게 싫어요 누르기.
   *
   * @param {*} userId
   * @param {*} likeUserId
   * @returns
   */
  createDislike = async (userId, dislikeUserId) => {
    try {
      const people = await LikeAndDislike.create({
        userId: userId,
        targetUserId: dislikeUserId,
        isLike: false,
      });
      return people;
    } catch (err) {
      console.error(err);
      return err.message;
    }
  };
  getLikePeople = async (userId) => {
    try {
      //로그인한 유저의 userId가 좋아요한 likeUserId의 배열
      const people = await LikeAndDislike.findAll({
        where: {
          userId: userId,
          isLike: true,
        },
        attributes: ["targetUserId"],

        raw: true,
      });

      let userList = [];

      //내가 좋아요 누른 그사람들도 날 좋아하는지
      for (let i in people) {
        const likeUserId = people[i].targetUserId;
        const userInfo = await User.findOne({
          where: { userId: likeUserId },
          raw: true,
        });
        const isLikeMe = await this.getIsLikeMe(userId, likeUserId);
        //userList.push(userInfo);
        userList[i] = {
          userId: userInfo.userId,
          email: userInfo.email,
          nickname: userInfo.nickname,
          age: userInfo.age,
          address: userInfo.address,
          gender: userInfo.gender ? true : false,
          imageUrl: userInfo.imageUrl,
          interest: userInfo.interest.split(""),
          likeMe: isLikeMe.isLikeMe,
        };
      }
      console.log(userList);
      return userList;
    } catch (err) {
      console.error(err);
      return err.message;
    }
  };
};
