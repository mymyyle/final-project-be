const express = require("express");
const commentController = require("../controllers/comment.controller");
const router = express.Router();
const { loginRequired } = require("../middlewares/authentication");

const {
  createComment,
  editComment,
  deleteComment,
  replyCommentByEmployer,
  getAllCommentByJobId,
} = commentController;

router.post("/create/:jobId", loginRequired, createComment);

router.put("/update/:id", loginRequired, editComment);

router.delete("/delete/:id", loginRequired, deleteComment);

//  let { page, limit, sort, reply } = req.query;
router.get("/all/:jobId", getAllCommentByJobId);

router.put("/:id", loginRequired, replyCommentByEmployer);

module.exports = router;
