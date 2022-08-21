const PeopleRepository = require("../repositories/people.repository");

module.exports = class PeopleService {
  peopleRepository = new PeopleRepository();

  getSwipe = async (userId) => {
    try {
      const recommended = await this.peopleRepository.getRecommend(userId);
      if (recommended === null)
        return { success: true, msg: "더 이상 추천할 사용자가 없습니다." };
      const people = await this.peopleRepository.getSwipe(userId, recommended);

      if (!people) return null;
      const result = {
        userId: people.userId,
        email: people.email,
        nickname: people.nickname,
        age: people.age,
        address: people.address,
        gender: people.gender,
        imageUrl: people.imageUrl,
        interest: people.interest.split(""),
        likeMe: people.likeMe,
      };
      return result;
    } catch (err) {
      console.error(err);
      return { success: false, msg: err.message };
    }
  };

  /**현재 사람을 좋아요 누른 후 getswipe 호출
   *
   * @param {*} userId
   * @param {*} likeUserId
   * @returns
   */
  likeSwipe = async (userId, likeUserId) => {
    try {
      const createLike = await this.peopleRepository.createLike(
        userId,
        likeUserId
      );
      const people = await this.getSwipe(userId);

      return people;
    } catch (err) {
      console.error(err);
      return { success: false, msg: err.message };
    }
  };

  dislikeSwipe = async (userId, dislikeUserId) => {
    try {
      const createDislike = await this.peopleRepository.createDislike(
        userId,
        dislikeUserId
      );
      const people = await this.getSwipe(userId);
      return people;
    } catch (err) {
      console.error(err);
      return { success: false, msg: err.message };
    }
  };

  likePeople = async (userId) => {
    try {
      const people = this.peopleRepository.getLikePeople(userId);

      return people;
    } catch (err) {
      console.error(err);
      return { success: false, msg: err.message };
    }
  };
};
