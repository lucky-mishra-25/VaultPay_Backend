const express = require("express");
const Stripe = require("stripe");

const Invoice = require("../models/Invoice");

const auth = require("../middleware/auth");

const router = express.Router();

const stripe = Stripe(
  process.env.STRIPE_SECRET_KEY
);

router.post(
  "/create-checkout-session",
  auth,
  async (req, res) => {
    try {
      const { invoiceId } = req.body;

      // FIND INVOICE
      const invoice =
        await Invoice.findById(invoiceId);

      // CHECK INVOICE EXISTS
      if (!invoice) {
        return res.status(404).json({
          message: "Invoice not found",
        });
      }

      // IDOR PROTECTION
      // ONLY OWNER CAN PAY
      if (
        invoice.client.toString() !==
        req.user.id
      ) {
        return res.status(403).json({
          message: "Forbidden",
        });
      }

      // STRIPE SESSION
      const session =
        await stripe.checkout.sessions.create(
          {
            payment_method_types: [
              "card",
            ],

            line_items: [
              {
                price_data: {
                  currency: "usd",

                  product_data: {
                    name:
                      invoice.description,
                  },

                  unit_amount:
                    invoice.amount *
                    100,
                },

                quantity: 1,
              },
            ],

            mode: "payment",

            success_url:
              "http://localhost:3000/success",

            cancel_url:
              "http://localhost:3000/cancel",

            metadata: {
              invoiceId:
                invoice._id.toString(),
            },
          }
        );

      res.json({
        url: session.url,
      });

    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Stripe Error",
      });
    }
  }
);

module.exports = router;