const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true},
    age: { type: Number, required: true },
    phone: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    ticketAmount: { type: Number, required: true },
    refNum: { type: String, required: true, unique: true },
    receiptQR: { type: String, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
