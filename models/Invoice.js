const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    amount: Number,

    description: String,

    status: {
      type: String,
      enum: ["Pending", "Paid"],
      default: "Pending",
    },

    stripeSessionId: String,

    pdfUrl: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Invoice", invoiceSchema);