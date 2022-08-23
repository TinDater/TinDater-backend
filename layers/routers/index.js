const express = require("express");
const router = express.Router();

const authRouter = require("./auth.router");
const userRouter = require("./user.router");
const peopleRouter = require("./people.router");

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/people", peopleRouter);

module.exports = router;
