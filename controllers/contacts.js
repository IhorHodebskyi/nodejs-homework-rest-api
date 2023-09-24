const { ctrlWrapper } = require("../helpers");
const services = require("../services/services");

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 3 } = req.query;
  const result = await services.allContacts(owner, page, limit);
  res.json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await services.getOneContact(contactId);
  res.json(result);
};

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const { body } = req;
  const result = await services.newContact(body, owner);
  res.status(201).json(result);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await services.removeContact(contactId);
  res.json(result);
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const { body } = req;
  const result = await services.updateContact(contactId, body);
  res.json(result);
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const { body } = req;
  const result = await services.updateStatusContact(contactId, body);
  res.json(result);
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
