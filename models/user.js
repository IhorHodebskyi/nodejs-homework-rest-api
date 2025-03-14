const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
      minLength: 6,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: emailRegexp,
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: { type: String, default: "" },
    avatarURL: { type: String, required: true },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
      default: "",
    },
  },
  { versionKey: false }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
}).messages({
  "any.required": `Missing required {#key} field`,
  "object.unknown": `{#key} field is not allowed`,
});

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
}).messages({
  "any.required": `Missing required {#key} field`,
  "object.unknown": `{#key} field is not allowed`,
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
}).messages({
  "any.required": `Missing required {#key} field`,
  "object.unknown": `{#key} field is not allowed`,
});

const schemas = {
  emailSchema,
  loginSchema,
  registerSchema,
};

const User = model("user", userSchema);

module.exports = { User, schemas };
