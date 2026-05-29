const express = require("express");

const Stripe = require("stripe");

const Invoice = require("../models/Invoice");

const generatePDF = require("../utils/generatePDF");

const sendEmail = require("../utils/sendEmail");

const router = express.Router();

const stripe = Stripe(
  process.env.STRIPE_SECRET_KEY
);


// STRIPE WEBHOOK
router.post(
  "/stripe",
  async (req, res) => {

    console.log("WEBHOOK HIT");

    const sig =
      req.headers[
        "stripe-signature"
      ];

    let event;

    try {

      event =
        stripe.webhooks.constructEvent(
          req.body,
          sig,
          process.env
            .STRIPE_WEBHOOK_SECRET
        );

      console.log(
        "Webhook Verified"
      );

    } catch (err) {

      console.log(
        "Webhook Error:",
        err.message
      );

      return res
        .status(400)
        .send(
          `Webhook Error: ${err.message}`
        );
    }


    // PAYMENT SUCCESS
    if (
      event.type ===
      "checkout.session.completed"
    ) {

      console.log(
        "Payment Success"
      );

      const session =
        event.data.object;

      // FIND INVOICE
      const invoice =
        await Invoice.findById(
          session.metadata.invoiceId
        ).populate("client");


      if (invoice) {

        // UPDATE STATUS
        invoice.status = "Paid";

        await invoice.save();

        console.log(
          "Invoice Updated"
        );


        // GENERATE PDF
        const pdfPath =
          await generatePDF(invoice);

        console.log(
          "PDF Generated"
        );


        // SEND EMAIL
        await sendEmail(
          invoice.client.email,
          pdfPath
        );

        console.log(
          "Email Sent"
        );
      }
    }

    res.json({
      received: true,
    });
  }
);

module.exports = router;