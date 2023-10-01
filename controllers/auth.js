const { ctrlWrapper } = require("../helpers");
const services = require("../services/authServices");

const register = async (req, res) => {
  const { body } = req;
  const result = await services.register(body);
  res.status(201).json(result);
};

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  await services.verifyEmail(verificationToken);
  res.status(200).json({ message: "Verification successful" });
};

const resendVerifyEmail = async (req, res) => {
  const { email } = req.user;
  await services.resendVerifyEmail(email);
  res.status(200).json({ message: "Verification email sent" });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const result = await services.login(email, password);
  res.status(200).json(result);
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.status(200).json({ email, subscription });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await services.logoutToken(_id);
  res.status(204).json();
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tmpUpload, originalname } = req.file;
  const result = await services.avatar(_id, tmpUpload, originalname);
  res.status(200).json(result);
};

module.exports = {
  register: ctrlWrapper(register),
  verifyEmail: ctrlWrapper(verifyEmail),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateAvatar: ctrlWrapper(updateAvatar),
};
