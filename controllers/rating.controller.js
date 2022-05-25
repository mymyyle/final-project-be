const ratingController = {};
const { sendResponse, catchAsync, throwError } = require("../helpers/utils");
const Rating = require("../models/rating");
const Job = require("../models/Job");
const User = require("../models/User");
const Application = require("../models/Application");

// router.post("/create", loginRequired, createRating);
ratingController.createRating = catchAsync(async (req, res, next) => {
  const { jobId, acceptorId, score, comment, type } = req.body;
  const { currentUserId } = req;

  const job = await Job.findOne({
    _id: jobId,
    isDeleted: false,
    status: "done",
  });

  if (!job)
    throwError(
      404,
      "job by id with status done not found",
      "create rating error"
    );

  const acceptor = await User.findOne({ _id: acceptorId, isDeleted: false });
  if (!acceptor) throwError(404, "acceptor not found", "create rating error");

  if (type !== "employer" && type !== "employee")
    throwError(400, "acceptorType not correct", "create rating error");

  if (score < 0 || score > 5 || !score)
    throwError(400, "score not correct", "create rating error");

  const rating = await Rating.create({
    jobId,
    voterId: currentUserId,
    acceptorId,
    score,
    comment,
    acceptorType: type,
  });
  console.log("score", score);
  console.log(
    "acceptor.totalEmployerScore before",
    acceptor.totalEmployerScore
  );
  console.log(`type`, type);
  if (type === "employer") {
    acceptor.employerRatingId.push(rating._id);
    acceptor.totalEmployerScore = acceptor.totalEmployerScore + score;
    // const application = Application.findOne({ jobId, candidateId: acceptorId });
    // if (!application)
    //   throwError(
    //     404,
    //     "application for this rating not found",
    //     "create rating error"
    //   );
    // else {
    //   console.log("here", application);
    //   application.isEmployeeRated = true;
    //   await application.save();
    // }
  }
  if (type === "employee") {
    acceptor.employeeRatingId.push(rating._id);
    acceptor.totalEmployeeScore = acceptor.totalEmployeeScore + score;
    if (score === 5) acceptor.allStart += 1;
    console.log(
      "acceptor.totalEmployerScore after",
      acceptor.totalEmployerScore
    );
    // const application = Application.findOne({
    //   jobId,
    //   // employerId: acceptorId,
    // });
    // console.log("here=========================>", application);
    // if (!application)
    //   throwError(
    //     404,
    //     "application for this rating not found",
    //     "create rating error"
    //   );
    // else {
    //   application.isEmployerRated = true;
    //   await application.save();
    // }
  }
  await acceptor.save();

  return sendResponse(
    res,
    200,
    true,
    { rating, acceptor },
    null,
    "create new rating successful"
  );
});

// router.put("/update/:id", loginRequired, editRating);
ratingController.editRating = catchAsync(async (req, res, next) => {});

// router.delete("/delete/:id", loginRequired, deleteRating);
ratingController.deleteRating = catchAsync(async (req, res, next) => {
  const { id } = req.param;
  const rating = await Rating.deleteOne({ _id: id });
});

// router.get("/all/:userId", getRatingByUserId);
ratingController.getRatingByUserId = catchAsync(async (req, res, next) => {
  const { type, page = 1, limit = 5 } = req.query;
  const { userId } = req.params;
  let ratingList;
  if (type === "employee" || type === "employer") {
    ratingList = await Rating.find({
      acceptorId: userId,
      acceptorType: type,
    })
      .populate("voterId")
      .populate("jobId");
  } else
    throwError(400, "acceptorType not correct", "get rating by user id error");
  const count = ratingList.length;
  const totalPage = Math.ceil(count / limit);
  const offset = (page - 1) * limit;
  const to = Number(offset) + Number(limit);
  console.log(`to`, to);
  ratingList = ratingList.slice(offset, to);

  return sendResponse(
    res,
    200,
    true,
    { ratingList, count, totalPage },
    null,
    "get rating by user id successful"
  );
});

module.exports = ratingController;
