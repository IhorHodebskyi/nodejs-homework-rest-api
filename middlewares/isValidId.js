const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../helpers");

const isValidID = (req, res, next) => {
  const id = req.params.contactId;
  if (!isValidObjectId(id)) {
    next(HttpError(400, `${id} is not valid id`));
  }
  next();
};

module.exports = isValidID;
