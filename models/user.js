var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");

var userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      maxlength: 50,
      trim: true,
    },
    emailId: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    encry_password: {
      type: String,
      required: true,
    },
    salt: String,
    role: {
      type: Number,
      default: 0,
    },
    purchases: {
      type: Array,
      default: [],
    },
    avatar: {
      type: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

// Schema Virtuals
userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv4();
    this.encry_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

// Schema Methods
userSchema.method({
  // Method to Authenticate Password Entered By User
  authenticate: function (plainPassword) {
    return this.securePassword(plainPassword) === this.encry_password;
  },
  // Method for Encrypting Password
  securePassword: function (plainpassword) {
    if (!plainpassword) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
});

module.exports = mongoose.model("User", userSchema);
