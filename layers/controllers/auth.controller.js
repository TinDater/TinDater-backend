const AuthService = require("../services/auth.service");
module.exports = class AuthController {
  authService = new AuthService();

  //회원가입
  createUser = async (req, res, next) => {
    try {
      const {
        email,
        password,
        confirm,
        nickname,
        age,
        address,
        gender,
        interest,
        imageUrl,
      } = req.body;

      //비밀번호 확인: 비밀번호와 비밀번호 확인란의 값이 같지 않다면 false 반환
      if (password !== confirm) {
        res.status(400).send({
          msg: "패스워드가 패스워드 확인란과 동일하지 않습니다.",
          success: false,
        });
        // return;
      }

      const createUserData = await this.authService.createUser(
        email,
        password,
        confirm,
        nickname,
        age,
        address,
        gender,
        interest,
        imageUrl
      );
      return res.send({
        status: createUserData.status,
        msg: createUserData.msg,
        success: createUserData.success,
      });
    } catch (err) {
      console.log(err);
      return { success: false, msg: err.message };
    }
  };

  //중복된 이메일 /유효성 검사

  checkDupEmail = async (req, res, next) => {
    try {
      const { email } = req.body;
      console.log(email);

      //유효성 검사
      const checkEmailEffectivenessData =
        await this.authService.checkEmailEffectiveness(email);

      if (!checkEmailEffectivenessData.success) {
        return res.send({
          msg: checkEmailEffectivenessData.msg,
          success: checkEmailEffectivenessData.success,
        });
      }

      //이메일 중복 검사
      const checkDupEmailData = await this.authService.checkEmailEffectiveness(
        email
      );
      if (checkDupEmailData);
      return res.send({
        msg: checkDupEmailData.msg,
        success: checkDupEmailData.success,
      });
    } catch (err) {
      console.log(err);
      return { success: false, msg: err.message };
    }
  };

  //닉네임 중복 /유효성 검사
  checkDupNickname = async (req, res, next) => {
    try {
      const { nickname } = req.body;

      const checkNicknameEffectivenessData =
        await this.authService.checkNicknameEffectiveness(nickname);

      return res.send({
        status: 400,
        msg: checkNicknameEffectivenessData.msg,
        success: checkNicknameEffectivenessData.success,
      });
    } catch (err) {
      console.log(err);
      return { success: false, msg: err.message };
    }
  };

  //로그인
  login = async (req, res, next) => {
    try {
      const { email, password, x, y } = req.body;
      // const isExistUser = await this.authService.login(email, password);
      const loginData = await this.authService.login(email, password);

      if (loginData.success == true) {
        return res.status(loginData.status).send({
          msg: loginData.msg,
          data: {
            success: loginData.success,
            token: loginData.token,
            userId: loginData.userId,
            nickname: loginData.nickname,
            imageUrl: loginData.imageUrl,
          },
        });
      } else {
        return res.status(loginData.status).send({
          success: loginData.success,
          msg: loginData.msg,
        });
      }
      // if (isExistUser) {
      //   return res.status(isExistUser.status).send({
      //     success: isExistUser.success,
      //     msg: isExistUser.msg,
      //   });
      // }
    } catch (err) {
      console.log(err);
      return { success: false, msg: err.message };
    }
  };
  checkToken = async (req, res, next) => {
    const { userId, nickname } = res.locals;
    try {
      if (nickname) return res.status(200).json({ success: true, nickname });
      else return res.status(400).json({ success: false, nickname: "" });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ success: false, msg: err.message });
    }
  };
};

//   //로그아웃
//   logout = async (req, res, next) => {
//     await res.clearCookie("token");
//     res.send({ success: true });
//   };

//   deleteUser = async (req, res, next) => {
//     const { user } = req.params;
//     const deleteUserData = this.authService;
//   };
// };

// class UserController {
//   userService = new UserService();
//   signService = new SignService();
//   //아직 테스트 해봐야 함.
//   updateUserProfile = async (req, res, next) => {
//     const { userId } = req.params;
//     let { password, newPassword, confirmNewPassword, newNickname, newMBTI } =
//       req.body;
//     const newProfilePicture = req.file.location;

//     const userStatus = await this.userService.getUserStatus(userId);

//     // const newProfilePicture = req.file; // 사진 파일
//     //입력한 new 비밀번호가 다른 경우

//     const checkDupPasswordData = await this.userService.checkPassword(
//       userId,
//       password
//     );
//     if (!checkDupPasswordData.success || newPassword !== confirmNewPassword) {
//       return res.send({
//         msg: "비밀번호가 일치하지 않습니다.",
//         success: false,
//       });
//     }

//     //입력한 비밀번호가 현재의 비밀번호와 같은 경우
//     const checkDupNewPasswordData = await this.userService.checkPassword(
//       userId,
//       newPassword
//     );
//     if (checkDupNewPasswordData.success && newPassword) {
//       return res.send({
//         msg: "기본 비밀번호와 다르게 설정해주세요.",
//         success: false,
//       });
//     }

//     //입력한 비밀번호의 유효성 검사
//     const checkEffectivenessNewPassword =
//       await this.signService.checkPasswordEffectiveness(
//         newPassword,
//         userStatus.email
//       );
//     if (!checkEffectivenessNewPassword.success && newPassword) {
//       return res.send({
//         success: checkEffectivenessNewPassword.success,
//         msg: checkEffectivenessNewPassword.msg,
//       });
//     }

//     //닉네임의 유효성, 중복 확인
//     const checkNicknameData = await this.signService.checkNicknameEffectiveness(
//       newNickname
//     );

//     if (!checkNicknameData.success && newNickname) {
//       return res.send({
//         success: checkNicknameData.success,
//         msg: checkNicknameData.msg,
//       });
//     }

//     if (newMBTI.length < 4 && newMBTI.length > 0) {
//       return res.send({
//         success: false,
//         msg: "MBTI를 확인하세요.",
//       });
//     }
//     switch ("") {
//       case newPassword:
//         newPassword = password;
//         break;
//       case newNickname:
//         newNickname = userStatus.nickname;
//         break;
//       case newMBTI:
//         newMBTI = userStatus.MBTI;
//         break;
//       default:
//         break;
//     }
//     if (newProfilePicture) {
//       const newProfilePicture = await this.signService.updateUserProfileData(
//         newProfilePicture.location
//       );
//     }
//     //위의 모든 조건들을 만족한다면 회원정보 업데이트
//     const updateUserProfileData = await this.userService.updateUserProfile(
//       userId,
//       newPassword,
//       newNickname,
//       newMBTI,
//       newProfilePicture
//     );

//     if (updateUserProfileData.success) {
//       return res.send({
//         success: updateUserProfileData.success,
//         msg: "유저정보가 수정되었습니다.",
//         nickname: newNickname,
//         MBTI: newMBTI,
//         profilePicture: newProfilePicture,
//       });
//     }
//     return res.send({
//       success: true,
//     });
//   };

//   //내가 쓴 글 보기
//   postOfLoginUser = async (req, res, next) => {
//     const { userId } = req.params;

//     const postOfLoginUserData = await this.userService.getPostOfLoginUser(
//       userId
//     );

//     res.send({
//       success: true,
//       data: postOfLoginUserData.data,
//     });
//   };
