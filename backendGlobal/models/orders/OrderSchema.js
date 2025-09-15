const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  orderId: {
    type: String,
    unique: true,
    required: true,
  },
  orderDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["Order Placed", "Processing", "Shipped", "Delivered", "Canceled", "Returned"],
    default: "Order Placed",
  },
  items: [
    {
      productName: { type: String, required: true },
      description: { type: String },
      price: { type: String, required: true },
      quantity: { type: Number, default: 1 },
      image: { type: String },
    },
  ],
  totalAmount: {
    type: String,
    required: true,
  },
  address: {
    name: { type: String },
    street: { type: String },
    city: { type: String },
    state: { type: String },
    pincode: { type: String },
    mobile: { type: String },
    type: { type: String },
  },
  orderStatus: {
    status: { type: String, enum: ["Canceled", "Returned"] },
    reason: { type: String },
    date: { type: Date },
    refundMethod: { type: String, enum: ["Wallet", "Bank"] },
    bankDetails: {
      accountNumber: { type: String },
      ifscCode: { type: String },
      accountHolder: { type: String },
    },
  },
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);