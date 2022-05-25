const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const applicationSchema = Schema(
  {
    jobId: {
      type: Schema.Types.ObjectId,
      ref: "Jobs",
      required: true,
    },
    employerId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    candidateId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    message: { type: String },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "approved", "rejected"],
    },
    isEmployerRated: { type: Boolean, default: false },
    isEmployeeRated: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Application = mongoose.model("Applications", applicationSchema);
module.exports = Application;
// jobId;
// employerId;
// candidateId;
// message:
//status: "pending", "approved", "rejected";
