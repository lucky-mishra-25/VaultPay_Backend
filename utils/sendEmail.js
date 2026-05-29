const nodemailer = require("nodemailer");

const sendEmail = async (to, pdfPath) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL,

    to,

    subject: "Receipt",

    text: "Payment Successful",

    attachments: [
      {
        filename: "receipt.pdf",
        path: pdfPath,
      },
    ],
  });
};

module.exports = sendEmail;