const PeopleRepository = require("../repositories/people.repository");

module.exports = class PeopleService {
  peopleRepository = new PeopleRepository();

  getRecommend = async (userId) => {
    try {
      const recommended = await this.peopleRepository.RecommendOne(userId);
      if (recommended === null)
        return {
          success: true,
          data: null,
          msg: "더 이상 추천할 사용자가 없습니다.",
        };
      const people = await this.peopleRepository.getRecommend(
        userId,
        recommended
      );

      if (people.success === false) throw new Error(people.msg);
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
      return { success: true, data: result };
    } catch (err) {
      console.error(err);
      return { success: false, msg: err.message };
    }
  };

  /**현재 사람을 좋아요 누른 후 getswipe 호출
   *
   * @param {"현재 로그인한 사용자"} userId
   * @param {"좋아요 누른 대상 사용자"} likeUserId
   * @returns
   */
  likeSwipe = async (userId, likeUserId) => {
    try {
      const isEstimated = await this.peopleRepository.getIsEstimated(
        userId,
        likeUserId
      );
      //평가된 적 없을 때만 평가 수행.
      if (isEstimated === false) {
        const createLike = await this.peopleRepository.createLike(
          userId,
          likeUserId
        );
      } else console.log("이미 평가된 사용자입니다.");

      const people = await this.getRecommend(userId);

      return { success: true, data: people.data };
    } catch (err) {
      console.error(err);
      return { success: false, msg: err.message };
    }
  };

  dislikeSwipe = async (userId, dislikeUserId) => {
    try {
      const isEstimated = await this.peopleRepository.getIsEstimated(
        userId,
        dislikeUserId
      );
      //평가된 적 없을 때만 평가 수행.
      if (isEstimated === false) {
        const createDislike = await this.peopleRepository.createDislike(
          userId,
          dislikeUserId
        );
      } else console.log("이미 평가된 사용자입니다.");
      const people = await this.getRecommend(userId);
      return { success: true, data: people.data };
    } catch (err) {
      console.error(err);
      return { success: false, msg: err.message };
    }
  };

  likePeople = async (userId) => {
    try {
      const people = await this.peopleRepository.getLikePeople(userId);
      return { success: true, data: people };
    } catch (err) {
      console.error(err);
      return { success: false, msg: err.message };
    }
  };
};
