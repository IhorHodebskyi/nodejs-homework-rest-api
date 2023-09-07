const express = require("express");
const Joi = require("joi");
const router = express.Router();
const { HttpError } = require("../../helpers");
const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
} = require("../../models/contacts");

const addSchema = Joi.object({
  name: Joi.string()
    .required("Missing required name field")
    .messages({ "any.required": "Missing required name field" }),
  email: Joi.string()
    .required("Missing required email field")
    .messages({ "any.required": "Missing required email field" }),
  phone: Joi.string()
    .required()
    .messages({ "any.required": "Missing required phone field" }),
});

router.get("/", async (req, res, next) => {
  try {
    const allContacts = await listContacts();
    res.json(allContacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const oneContact = await getContactById(contactId);
    if (!oneContact) {
      throw HttpError(404, "Not found");
      // const error = new Error("Not Found");
      // error.status = 404;
      // throw error;
    }
    res.json(oneContact);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(404, error.message);
    }
    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const remove = await removeContact(contactId);
    if (!remove) {
      throw HttpError(4004, "Not found");
    }
    res.json({ message: "Delete contact" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(404, error.message);
    }
    const { contactId } = req.params;
    const update = await updateContact(contactId, req.body);
    if (!update) {
      throw HttpError(404, "Not found");
    }
    res.json(update);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
