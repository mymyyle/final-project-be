const commentController = {};
const { sendResponse, catchAsync, throwError } = require("../helpers/utils");
const { find } = require("../models/Comment");
const Comment = require("../models/Comment");
const Job = require("../models/Job");

// 1. User can create a comment to job post
commentController.createComment = catchAsync(async (req, res, next) => {
  const { jobId } = req.params;
  const job = await Job.findOne({ _id: jobId, isDeleted: false });
  if (!job) throwError(404, "job id not found", "create comment error");

  const { currentUserId } = req;
  const { content } = req.body;
  if (!content) throwError(400, "missing content", "create comment error");
  const newComment = await Comment.create({
    jobId,
    authorCommentId: currentUserId,
    content,
    reply: "",
  });
  await newComment.populate("authorCommentId");
  return sendResponse(
    res,
    200,
    true,
    newComment,
    null,
    "create comment successful"
  );
});

// 2. Author of Comment can update that comment:  isEdit:true
commentController.editComment = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { currentUserId } = req;

  let comment = await Comment.findOne({
    _id: id,
    authorCommentId: currentUserId,
  });
  if (!comment)
    throwError(
      404,
      "comment of this account is not found",
      "edit comment error"
    );
  const { content } = req.body;
  if (!content) throwError(400, "missing content", "edit comment error");
  comment.content = content;
  comment.isEdited = true;
  await comment.populate("authorCommentId");
  await comment.save();
  return sendResponse(res, 200, true, comment, null, "edit comment successful");
});

// 3. Author of Comment can delete that comment
commentController.deleteComment = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { currentUserId } = req;
  const comment = await Comment.findOne({
    _id: id,
    authorCommentId: currentUserId,
  });
  if (!comment)
    throwError(
      404,
      "comment of this account is not found",
      "delete comment error"
    );
  await Comment.deleteOne(comment);
  return sendResponse(
    res,
    200,
    true,
    comment,
    null,
    "delete comment successful"
  );
});

// 4. Employer can reply comment
commentController.replyCommentByEmployer = catchAsync(
  async (req, res, next) => {
    const { id } = req.params;
    const comment = await Comment.findOne({
      _id: id,
    });
    if (!comment) throwError(404, "comment not found", "reply comment error");

    const job = await Job.findOne({ _id: comment.jobId, isDeleted: false });
    if (!job)
      throwError(404, "job contains comment not found", "reply comment error");

    const { currentUserId } = req;
    if (!job.authorId.equals(currentUserId))
      throwError(401, "only job's author can reply  ", "reply comment error");

    const { reply } = req.body;
    if (!reply) throwError(400, "missing reply content", "reply comment error");
    comment.reply = reply;
    await comment.populate("authorCommentId");
    await comment.save();
    return sendResponse(
      res,
      200,
      true,
      comment,
      null,
      "reply comment successful"
    );
  }
);

// 5. user can see comment (not login required)
commentController.getAllCommentByJobId = catchAsync(async (req, res, next) => {
  const { jobId } = req.params;
  if (!jobId)
    throwError(404, "job not found", "get all comment by job id error");
  const job = await Job.findOne({ _id: jobId, isDeleted: false });
  if (!job) throwError(404, "job not found", "get all comment by job id error");

  let commentList = await Comment.find({ jobId });

  let { page, limit, sort, reply } = req.query;
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 5;
  sort = sort === "asc" ? -1 : 1;

  const filterCriteria =
    reply === "missing" ? { $and: [{ jobId }, { reply: "" }] } : { jobId };

  const count = commentList.length;
  const totalPage = Math.ceil(count / limit);

  // const offset = limit * (page - 1);
  let offset = count - limit * page;
  if (offset < 0) {
    limit = limit + offset;
    offset = 0;
  }

  commentList = await Comment.find(filterCriteria)
    .sort({ createdAt: sort })
    .skip(offset)
    .limit(limit)
    .populate("authorCommentId");
  return sendResponse(
    res,
    200,
    true,
    { commentList, totalPage, count },
    null,
    "get all comment by job id successful"
  );
});

// 1 2 3 4 5

// dong 137 => 5 4 3 2 1

//11cmt, limit 3
//page 1: 8-10 ---> 11-3,
//page 2: 5 6 7---> 11-3*2,
//page 3: 2 3 4--> 11-3*3,
//page 4: 0 1 -->count-limit*page<0-->0   ,
module.exports = commentController;
