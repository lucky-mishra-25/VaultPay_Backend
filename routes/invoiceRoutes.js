const express = require("express");

const Invoice = require("../models/Invoice");

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const router = express.Router();

router.post("/create", auth, admin, async (req, res) => {
  const invoice = await Invoice.create(req.body);

  res.json(invoice);
});

router.get("/my-invoices", auth, async (req, res) => {
  let invoices;

  if (req.user.role === "admin") {
    invoices = await Invoice.find().populate("client");
  } else {
    invoices = await Invoice.find({
      client: req.user.id,
    });
  }

  res.json(invoices);
});

router.get("/:id", auth, async (req, res) => {
  let invoice;

  if (req.user.role === "admin") {
    invoice = await Invoice.findById(req.params.id);
  } else {
    invoice = await Invoice.findOne({
      _id: req.params.id,
      client: req.user.id,
    });
  }

  if (!invoice) {
    return res.status(403).json({
      message: "Forbidden",
    });
  }

  res.json(invoice);
});

module.exports = router;