const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const indexRouter = require("./routes/index");
const { sendResponse } = require("./helpers/utils");
const createUser = require("./CreateUser");
const createJob = require("./CreateJob");
const createApplication = require("./createApplication");

require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const mongoURI = process.env.MONGO_DEV_URI;

const app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log(`DB connected`);
    // createUser(200);
    // createJob(1);
    // createApplication(5);
  })
  .catch((err) => console.log(err));

app.use("/", indexRouter);

app.use((req, res, next) => {
  const err = new Error("Page Not Found");
  err.statusCode = 404;
  err.isOperational = true;
  next(err);
});

app.use((err, req, res, next) => {
  console.log(`ERROR`, err);
  if (err.isOperational) {
    return sendResponse(
      res,
      err.statusCode ? err.statusCode : 500,
      false,
      null,
      { message: err.message },
      err.type
    );
  } else {
    return sendResponse(
      res,
      err.statusCode ? err.statusCode : 500,
      false,
      null,
      { message: err.message },
      "Internal Server Error"
    );
  }
});

module.exports = app;
