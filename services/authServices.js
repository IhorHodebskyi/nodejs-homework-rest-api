const { User } = require("../models/user");
const { HttpError } = require("../helpers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const signUp = async (body) => {
  const { email, password } = body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const result = await User.create({ ...body, password: hashPassword });
  const data = {
    user: {
      email: result.email,
      subscription: result.subscription,
    },
  };
  return data;
};

const signIn = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }
  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });
  const data = {
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  };
  return data;
};

const logoutToken = async (_id) =>
  await User.findByIdAndUpdate(_id, { token: "" });

module.exports = { signUp, signIn, logoutToken };
