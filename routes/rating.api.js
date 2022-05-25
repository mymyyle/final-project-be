const express = require("express");
const ratingController = require("../controllers/rating.controller");
const router = express.Router();
const { loginRequired } = require("../middlewares/authentication");
const { createRating, editRating, deleteRating, getRatingByUserId } =
  ratingController;

router.post("/create", loginRequired, createRating);

router.put("/update/:id", loginRequired, editRating);

router.delete("/delete/:id", loginRequired, deleteRating);

router.get("/all/:userId", getRatingByUserId);

module.exports = router;
