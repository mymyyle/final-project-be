const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");

const userSchema = Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    avatarUrl: { type: String },
    aboutMe: { type: String },
    isDeleted: { type: Boolean, default: false, select: false },

    employerRatingId: { type: Array },
    totalEmployerScore: { type: Number, default: 0 },

    employeeRatingId: { type: Array },
    totalEmployeeScore: { type: Number, default: 0 },
    allStart: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.password;
  delete obj.isDeleted;
  return obj;
};

userSchema.methods.generateToken = function () {
  const accessToken = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
  return accessToken;
};

const User = mongoose.model("Users", userSchema);
module.exports = User;

// _userId:""
// name: required
// email: required
// password: required
// avatarUrl:
// aboutMe:
// isDeleted:
