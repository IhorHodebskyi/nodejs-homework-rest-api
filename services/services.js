const { Contact } = require("../models/contact");
const { HttpError } = require("../helpers");

const allContacts = async (owner, page, limit) => {
  const skip = (page - 1) * limit;
  console.log(skip);
  const result = await Contact.find({ owner })
    .skip(skip)
    .limit(limit)
    .populate("owner", " email subscription ");
  return result;
};

const getOneContact = async (id) => {
  const result = await Contact.findById(id);
  if (!getOneContact) {
    throw HttpError(404);
  }
  return result;
};

const newContact = async (data, owner) => {
  const result = await Contact.create({ ...data, owner });
  return result;
};

const removeContact = async (id) => {
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404);
  }
  return { message: "Delete contact" };
};
const updateContact = async (id, data) => {
  const result = await Contact.findByIdAndUpdate(id, data, { new: true });
  if (!result) {
    throw HttpError(404);
  }
  return result;
};

const updateStatusContact = async (id, data) => {
  const result = await Contact.findByIdAndUpdate(id, data, { new: true });
  if (!result) {
    throw HttpError(404);
  }
  return result;
};

module.exports = {
  allContacts,
  getOneContact,
  newContact,
  removeContact,
  updateContact,
  updateStatusContact,
};
