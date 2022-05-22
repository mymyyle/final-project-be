const bcrypt = require("bcryptjs/dist/bcrypt");
const User = require("./models/User");

const random_name = require("node-random-name");
const createUser = async (numberOfUser) => {
  for (let i = 0; i < numberOfUser; i++) {
    const salt = await bcrypt.genSalt(10);
    let password = "123";
    password = await bcrypt.hash(password, salt);

    let email = random_name({ last: true });
    email = email + "@gmail.com";

    const singleUser = {
      name: random_name(),
      email,
      password,
      avatarUrl: "",
      aboutMe: "",
    };

    const found = await User.findOne({ email: singleUser.email });
    console.log("Creating user");
    if (!found) {
      const result = await User.create(singleUser);
      console.log("===============");
      console.log(`create ${result.name} success`);
    }
  }
};
module.exports = createUser;
