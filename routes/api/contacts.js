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
    .required()
    .messages({ "any.required": "Missing required name field" }),
  email: Joi.string()
    .required()
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
    const id = req.params.contactId;
    const oneContact = await getContactById(id);
    if (!oneContact) {
      throw HttpError(404, "Not found");
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
      throw HttpError(400, error.message);
    }
    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const remove = await removeContact(id);
    if (!remove) {
      throw HttpError(404, "Not found");
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
      const { phone, email, name } = req.body;
      if (phone || email || name) {
        throw HttpError(400, error.message);
      }
      throw HttpError(400, "missing fields");
    }
    const id = req.params.contactId;

    const update = await updateContact(id, req.body);
    if (!update) {
      throw HttpError(404, "Not found");
    }
    res.json(update);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
