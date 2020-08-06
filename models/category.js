const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var categorySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      unique: true,
    },
    avatar: {
      type: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
