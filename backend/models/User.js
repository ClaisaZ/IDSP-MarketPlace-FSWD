const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    phone: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    ticketAmount: { type: Number, required: true },
    refNum: { type: String, required: true, unique: true },
    receiptQR: { type: String, required: true },
    role: { 
      type: String, 
      enum: ["buyer", "seller", "admin"], 
      default: "buyer" 
    },
    profilePicture: { 
      type: String, 
      default: null 
    },
    bio: { 
      type: String, 
      default: "" 
    },
    interests: { 
      type: [String], 
      enum: [
    "Design",
    "Creativity",
    "Tech",
    "Math",
    "Marketing",
    "Finance",
    "Fine Art",
    "Writing",
    "Sales",
    "Teaching",
    "Coding",
    "Research",
    "Fashion",
    "Hair",
    "Pottery",
    "Cooking",
    ],
      default: [] 
    },
    workshopsAttended: { 
      type: Number, 
      default: 0 
    },
    friends: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User" 
    }],
    posts: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Post" 
    }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);