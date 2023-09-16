const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const keys = Object.keys(req.body);
      const { patch } = req.route.methods;
      if (keys.length > 0) {
        throw HttpError(400, error.message);
      }
      throw HttpError(400, patch ? "missing field favorite" : "missing fields");
    }
    next();
  };
  return func;
};

module.exports = validateBody;
