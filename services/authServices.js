const { User } = require("../models/user");
const { HttpError } = require("../helpers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const avatarDir = path.join(__dirname, "../", "public", "avatar");

const { SECRET_KEY } = process.env;

const signUp = async (body) => {
  const { email, password } = body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const result = await User.create({
    ...body,
    password: hashPassword,
    avatarURL,
  });
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

const logoutToken = async (_id) => {
  return await User.findByIdAndUpdate(_id, { token: "" });
};

const avatar = async (_id, tmpUpload, originalname) => {
  const filename = `${_id}_${originalname}`;
  const img = await Jimp.read(tmpUpload);
  img.resize(250, 250).writeAsync(tmpUpload);
  const resultUpload = path.join(avatarDir, filename);
  await fs.rename(tmpUpload, resultUpload);
  const avatarURL = path.join("avatar", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });
  return { avatarURL };
};

module.exports = { signUp, signIn, logoutToken, avatar };
