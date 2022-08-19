const UserService = require("../services/user.service");

class UserController {
    userService = new UserService();

    //마이 페이지 확인
    getMypage = async (req, res, next) => {
        try {
            const {userId} = req.params;
            const getMypageData = await this
                .userService
                .getMypage(userId);

            res
                .status(201)
                .json({data: getMypageData});
        } catch (error) {
            res.json({errorMessage: "마이페이지 확인 에러"})
        }
    }

    //마이 페이지 수정
    updateMypage = async (req, res, next) => {
        try {
            const {userId} = req.params;
            const {
                email,
                nickname,
                age,
                address,
                gender,
                imageUrl,
                interests
            } = req.body;
            const updateMypageData = await this
                .userService
                .updateMypage(
                    userId,
                    email,
                    nickname,
                    age,
                    address,
                    gender,
                    imageUrl,
                    interests
                )

        } catch (error) {
            res.json({errorMessage: "마이페이지 수정 에러"})
        }
    }

    //사진 업로드
    uploadImg = async (req, res, next) => {}
}
module.exports = UserController;