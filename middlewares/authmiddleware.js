const jwt = require("jsonwebtoken");
require("dotenv").config();
const env = process.env;
const AuthRepository = require("../layers/repositories/auth.repository");
const authRepository = new AuthRepository();

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  const [Type, token] = (authorization || "").split(" ");

  if (!token || Type !== "Bearer") {
    res.send({
      errorMessage: "로그인 후 사용하세요",
    });
    return;
  }

  const tokenvoll = jwt.verify(token, env.SECRET_KEY);
  res.locals.userId = tokenvoll.userId;
  console.log(res.locals.userId);

  const userData = await authRepository.returnUserStatus(tokenvoll.userId);
  res.locals.nickname = userData.nickname;

  console.log(userId, userData, nickname);

  // next();
};
