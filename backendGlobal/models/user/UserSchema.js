const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  street: { type: String, required: true, trim: true },
  city: { type: String, required: true, trim: true },
  pincode: { type: String, required: true, trim: true, match: /^[0-9]{6}$/ },
  state: { type: String, required: true, trim: true },
  mobile: { type: String, required: true, trim: true, match: /^[0-9]{10}$/ },
  type: { type: String, required: true, enum: ["Home", "Work", "Other"] },
  isDefault: { type: Boolean, default: false },
});

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, default: "", trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2})?$/,
  },
  mobileNumber: { type: String, required: true, trim: true, match: /^[0-9]{10}$/ },
  gender: { type: String, enum: ["Male", "Female", "Other", ""], default: "", trim: true },
  dob: { type: Date, default: null },
  location: { type: String, default: "", trim: true },
  alternateMobile: { type: String, default: "", trim: true, match: /^[0-9]{10}$|^$/ },
  profileImage: { type: String, default: "", trim: true },
  password: { type: String, required: true },
  addresses: [addressSchema],
  deletedAt: { type: Date, default: null },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);