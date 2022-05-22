const userController = {};
const bcrypt = require("bcryptjs/dist/bcrypt");
const { use } = require("express/lib/router");
const { sendResponse, catchAsync, throwError } = require("../helpers/utils");
const User = require("../models/User");

// 1. User can create account with email and password and name
userController.register = catchAsync(async (req, res, next) => {
  let { name, password, email, avatarUrl, aboutMe } = req.body;
  console.log(name, password, email);
  if (!name || !password || !email) {
    throwError(400, "Missing info", "Login error");
  }

  const found = await User.findOne({ email });
  if (found) throwError(400, "User already exists", "Login error");

  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);

  const newUser = {};
  newUser.name = name;
  newUser.email = email;
  newUser.password = password;
  newUser.avatarUrl = avatarUrl ? avatarUrl : "";
  newUser.aboutMe = aboutMe ? aboutMe : "";

  const user = await User.create(newUser);
  const accessToken = user.generateToken();

  return sendResponse(
    res,
    200,
    true,
    { user, accessToken },
    null,
    "Create user successful"
  );
});

// 2. User can login with email and password
userController.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!password || !email) {
    throwError(400, "Missing info", "Login error");
  }
  const user = await User.findOne({ email, isDeleted: false }, "+password");
  if (!user) throwError(400, "User not found", "login error");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throwError(400, "Password is not match", "login error");

  const accessToken = user.generateToken();

  return sendResponse(
    res,
    200,
    true,
    { user, accessToken },
    null,
    "Login successful"
  );
});

// 4. user can get single user profile by id (login required)
userController.getSingleUserById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOne({ _id: id, isDeleted: false });
  if (!user) throwError(404, "User not found", "get user by id error");

  return sendResponse(res, 200, true, user, null, "get user by id successful");
});

// 5. Owner can update own account profile (password?)
userController.updateAccount = catchAsync(async (req, res, next) => {
  let { newPassword, confirmPassword } = req.body;
  const { currentUserId } = req;

  let user = await User.findOne(
    { _id: currentUserId, isDeleted: false },
    "+password"
  );
  if (!user) throwError(404, "User not found", "update user error");
  console.log(`name`, req.body.name);
  const allows = ["name", "avatarUrl", "aboutMe"];
  allows.forEach((field) => {
    if (req.body[field] !== "") {
      user[field] = req.body[field];
    }
  });

  if (newPassword && confirmPassword) {
    const isMatch = await bcrypt.compare(newPassword, user.password);
    if (isMatch)
      throwError(
        400,
        "new password must be differently older password",
        "update user error"
      );

    if (newPassword !== confirmPassword) {
      throwError(
        400,
        "new password and confirm password are not match",
        "update user error"
      );
    } else {
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(newPassword, salt);
      user.password = password;
    }
  } else if (newPassword || confirmPassword)
    throwError(400, "missing info to change password", "update user error");

  await user.save();
  return sendResponse(res, 200, true, user, null, "update user successful");
});

// 6. Owner can deactivate own account
userController.deactivateAccount = catchAsync(async (req, res, next) => {
  const { currentUserId } = req;
  let user = await User.findOne(
    { _id: currentUserId, isDeleted: false },
    "+isDeleted"
  );
  if (!user) throwError(404, "User not found", "deactivate Account error");
  user.isDeleted = true;
  await user.save();

  return sendResponse(
    res,
    200,
    true,
    user,
    null,
    "deactivate account successful"
  );
});

userController.getUserByAccessToken = catchAsync(async (req, res, next) => {
  const { currentUserId } = req;
  let user = await User.findOne({ _id: currentUserId, isDeleted: false });
  if (!user) throwError(404, "User not found", "deactivate Account error");
  return sendResponse(
    res,
    200,
    true,
    user,
    null,
    "get user by access token successful"
  );
});

userController.countTotalUser = catchAsync(async (req, res, next) => {
  const count = await User.countDocuments({ isDeleted: false });
  return sendResponse(
    res,
    200,
    true,
    { count },
    null,
    "count total user successful"
  );
});
module.exports = userController;
