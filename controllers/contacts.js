const { HttpError, ctrlWrapper } = require("../helpers");
const { Contact } = require("../models/contact");

const listContacts = async (req, res) => {
  const allContacts = await Contact.find();
  res.json(allContacts);
};

const getContactById = async (req, res) => {
  const id = req.params.contactId;
  const oneContact = await Contact.findById(id);
  if (!oneContact) {
    throw HttpError(404, "Not found");
  }
  res.json(oneContact);
};

const addContact = async (req, res) => {
  const newContact = await Contact.create(req.body);
  res.status(201).json(newContact);
};

const removeContact = async (req, res) => {
  const id = req.params.contactId;
  const remove = await Contact.findByIdAndRemove(id);
  if (!remove) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "Delete contact" });
};

const updateContact = async (req, res) => {
  const id = req.params.contactId;
  const update = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!update) {
    throw HttpError(404, "Not found");
  }
  res.json(update);
};

const updateStatusContact = async (req, res) => {
  const id = req.params.contactId;
  const update = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  console.log(update);
  if (!update) {
    throw HttpError(404, "Not found");
  }
  res.json(update);
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
