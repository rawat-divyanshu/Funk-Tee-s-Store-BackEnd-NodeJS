const mongoose = require("mongoose");
const Cart = require("./cart");

const { ObjectId } = mongoose.Schema;

var orderSchema = new mongoose.Schema(
  {
    products: {
      type: [ObjectId],
      ref: "Cart",
    },
    transactionId: {},
    amount: {
      type: Number,
    },
    address: String,
    updated: Date,
    user: {
      type: ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      default: "Received",
      enum: ["Cancelled", "Processing", "Delievered", "Shipped", "Received"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
