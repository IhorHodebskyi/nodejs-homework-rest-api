const nodemailer = require("nodemailer");

const { HOST, EMAIL_FROM, USER_PASSWORD } = process.env;

const transporter = nodemailer.createTransport(
  {
    host: HOST,
    port: 465,
    secure: true,
    auth: {
      user: EMAIL_FROM,
      pass: USER_PASSWORD,
    },
  },
  {
    from: `"Fred Foo 👻" <${EMAIL_FROM}>`,
  }
);

const sendEmail = (message) => {
  transporter.sendMail(message).catch(console.error);
};

module.exports = sendEmail;
