const mongoose = require("mongoose");

const TransactionHistorySchema = new mongoose.Schema(
  {
    customerId: { type: String, required: true },
    productId: {
      type: String,
    },
    orderId: {
      type: String,
    },
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TransactionHistory", TransactionHistorySchema);
