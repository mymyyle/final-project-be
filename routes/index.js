const express = require("express");
const router = express.Router();

const userRouter = require("./user.api");
router.use("/user", userRouter);

const jobRouter = require("./job.api");
router.use("/job", jobRouter);

const commentRouter = require("./comment.api.js");
router.use("/comment", commentRouter);

const applicationRouter = require("./application.api");
router.use("/application", applicationRouter);

module.exports = router;
