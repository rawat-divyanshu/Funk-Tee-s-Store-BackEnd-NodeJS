const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

var cartSchema = new mongoose.Schema(
  {
    product: {
      type: ObjectId,
      ref: "Product",
    },
    name: String,
    count: Number,
    price: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
