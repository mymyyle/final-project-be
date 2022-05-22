const Application = require("./models/Application");
const User = require("./models/User");
const Job = require("./models/Job");

const AUTHOR_ID = [
  "62780457ee65e92c56eaaf01",
  "6279e8af6bf0c20f6109c340",
  "6279eb5f0ba371420e6b0748",
  "627e96fd8f82de204333a22e",
  "62872fb878a571a49ed091f7",
  "62872efcf58a693a31be9d4e",
  "6282b4d337e8fe11f954085a",
];

const createApplication = async (numberOfApplication) => {
  const candidates = await User.find({ isDelete: false });
  // const jobs = await Job.find({ isDelete: false }, { authorId: AUTHOR_ID[6] });
  const STATUS = ["pending", "approved", "rejected"];
  for (let i = 0; i < numberOfApplication; i++) {
    const status = Math.ceil(Math.random() * 3 - 1);
    const singleApplication = {
      // jobId: jobs[i]._id,
      jobId: "6288b54944bf791098934417",
      employerId: AUTHOR_ID[1],
      candidateId: candidates[i + 2]._id,
      message: "hello",
      // status: STATUS[status],
      status: STATUS[status],
      createdAt: "2022-05-22T10:47:39.175Z",
      updatedAt: "2022-05-22T10:47:39.175Z",
    };
    console.log("singleApplication", singleApplication);
    const result = await Application.create(singleApplication);
    console.log("===============");
    console.log(`create ${result.status} success`);
  }
};
module.exports = createApplication;
