const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ratingSchema = Schema(
  {
    jobId: {
      type: Schema.Types.ObjectId,
      ref: "Jobs",
      required: true,
    },
    voterId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    acceptorId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    acceptorType: {
      type: String,
      enum: ["employee", "employer"],
    },
    comment: { type: String, default: "" },
    score: { type: Number, required: true },
  },
  { timestamps: true }
);

const Rating = mongoose.model("Rating", ratingSchema);
module.exports = Rating;
