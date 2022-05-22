const express = require("express");
const jobController = require("../controllers/job.controller");
const router = express.Router();
const { loginRequired } = require("../middlewares/authentication");
const {
  createJob,
  editJob,
  deleteJob,
  getSingleJobByJobId,
  getAllJob,
  getJobByAuthorId,
} = jobController;

router.post("/create", loginRequired, createJob);

router.put("/update/:id", loginRequired, editJob);

router.delete("/delete/:id", loginRequired, deleteJob);

router.get("/all", getAllJob);

router.get("/me/all", loginRequired, getJobByAuthorId);

router.get("/:id", getSingleJobByJobId);

module.exports = router;
