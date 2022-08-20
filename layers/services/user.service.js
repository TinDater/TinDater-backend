const UserRepository = require("../repositories/user.repository");

class UserService {
    userRepository = new UserRepository();

    //마이 페이지 확인
    getMypage = async (userId) => {
        const getMypageData = await this.UserRepository.getMypage(userId);

        return getMypageData;
    }

    //마이 페이지 수정
    updateMypage = async (
        userId,
        email,
        nickname,
        age,
        address,
        gender,
        imageUrl,
        interests
    ) => {
        const updateMypageData = await this.UserRepository.updateMypage(
                userId,
                email,
                nickname,
                age,
                address,
                gender,
                imageUrl,
                interests
            );

        return updateMypageData; //interests를 어떻게 가공해서 줘야할지 고민필요
    }


}

module.exports = UserService;