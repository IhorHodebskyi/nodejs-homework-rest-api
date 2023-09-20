const { User } = require("../models/user");
const { HttpError } = require("../helpers");
const bcrypt = require("bcrypt");

const newUser = async (body) => {
  const { email, password } = body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const result = await User.create({ ...body, password: hashPassword });
  return result;
};

const oldUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }
  const token = "exampletoken";
  const result = {
    token,
    email: user.email,
    subscription: user.subscription,
  };
  return result;
};

module.exports = { newUser, oldUser };
