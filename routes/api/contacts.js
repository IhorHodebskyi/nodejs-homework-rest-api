const express = require("express");
const ctrl = require("../../controllers/contacts");
const { validateBody, isValidID } = require("../../middlewares");
const { addSchema, updateFavoriteSchema } = require("../../models/contact");

const router = express.Router();

router.get("/", ctrl.listContacts);

router.get("/:contactId", isValidID, ctrl.getContactById);

router.post("/", validateBody(addSchema), ctrl.addContact);

router.delete("/:contactId", isValidID, ctrl.removeContact);

router.put(
  "/:contactId",
  isValidID,
  validateBody(addSchema),
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  isValidID,
  validateBody(updateFavoriteSchema),
  ctrl.updateStatusContact
);

module.exports = router;
