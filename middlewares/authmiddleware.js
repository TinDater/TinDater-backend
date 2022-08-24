const jwt = require("jsonwebtoken");
require("dotenv").config();
const env = process.env;
const AuthRepository = require("../layers/repositories/auth.repository");
const authRepository = new AuthRepository();

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  const [Type, token] = (authorization || "").split(" ");

  try {
    if (!token || Type !== "Bearer") {
      return res.status(400).json({
        success: false,
        nickname: "",
        msg: "로그인 후 사용하세요.",
      });
    }

    const tokenvoll = jwt.verify(token, env.ACCESS_SECRET);
    res.locals.userId = tokenvoll.userId;

    const userData = await authRepository.returnUserStatus(tokenvoll.userId);
    res.locals.nickname = userData.nickname;
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, nickname: "", msg: err.message });
  }

  next();
};
