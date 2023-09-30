const { ctrlWrapper } = require("../helpers");
const services = require("../services/authServices");

const register = async (req, res) => {
  const { body } = req;
  const result = await services.signUp(body);
  res.status(201).json(result);
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const result = await services.signIn(email, password);
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
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateAvatar: ctrlWrapper(updateAvatar),
};
