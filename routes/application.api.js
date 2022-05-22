const express = require("express");
const applicationController = require("../controllers/application.controller");
const router = express.Router();
const { loginRequired } = require("../middlewares/authentication");

const {
  applyJob,
  cancelJob,
  getAllApplicationsByJobId,
  respondRequest,
  getAllOwnJobApplication,
  getOwnApplicationByJobId,
  getAllApplication,
} = applicationController;

router.post("/all", getAllApplication);

router.put("/apply/:jobId", loginRequired, applyJob);

router.delete("/cancel/:jobId", loginRequired, cancelJob);

router.put("/respond/:jobId", loginRequired, respondRequest);

router.get("/me", loginRequired, getAllOwnJobApplication);

router.get("/me/:jobId", loginRequired, getOwnApplicationByJobId);

router.get("/:jobId", loginRequired, getAllApplicationsByJobId);

module.exports = router;
