const { Contact } = require("../models/contact");
const { HttpError } = require("../helpers");

const allContacts = async () => {
  return await Contact.find();
};

const oneContact = async (id) => {
  const result = await Contact.findById(id);
  if (!oneContact) {
    throw HttpError(404, "Not found");
  }
  return result;
};

const newContact = async (data) => {
  const result = await Contact.create(data);
  return result;
};

const removeContact = async (id) => {
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  return { message: "Delete contact" };
};
const updateContact = async (id, data) => {
  const result = await Contact.findByIdAndUpdate(id, data, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  return result;
};

const updateStatusContact = async (id, data) => {
  const result = await Contact.findByIdAndUpdate(id, data, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  return result;
};

module.exports = {
  allContacts,
  oneContact,
  newContact,
  removeContact,
  updateContact,
  updateStatusContact,
};
