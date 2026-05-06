const mongoose = require("mongoose");

const workshopSchema = new mongoose.Schema(
  {
    name: String,
    date: String,
    time: String,
    location: String,
    about: String,
    ticketPrice: String,
    applicationPeriod: String,
    seats: String,
    imageUrl: String,
    hostedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Workshop", workshopSchema);
