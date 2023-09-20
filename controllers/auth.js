const { ctrlWrapper } = require("../helpers");
const services = require("../services/authServices");

const register = async (req, res) => {
  const { body } = req;
  const result = await services.newUser(body);
  res.status(201).json({
    user: {
      email: result.email,
      subscription: result.subscription,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const result = await services.oldUser(email, password);
  res.status(200).json({
    token: result.token,
    user: {
      email: result.email,
      subscription: result.subscription,
    },
  });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
};
