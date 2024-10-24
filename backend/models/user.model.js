const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: { type: String },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  googleId: { type: String },
  otp: { type: String },          // Field for storing OTP
  otpExpiry: { type: Date },      // Field for storing OTP expiry
  createdOn: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
