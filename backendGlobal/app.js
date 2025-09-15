const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ 
  origin: ["http://localhost:5173"],
  credentials: true 
}));

// Routes
app.use("/api/users", require("./routes/User/UserRoutes"));
app.use("/api/coupons", require("./routes/Coupons/CouponRoutes"));
app.use("/api/orders", require("./routes/Orders/OrderRoutes"));

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Server Error:", err);

  // Handle Multer-specific errors
  if (err instanceof require("multer").MulterError) {
    return res.status(400).json({
      success: false,
      message: "File upload error",
      error: err.message
    });
  }

  // Handle file filter errors
  if (err.message === "Only JPG, PNG, and GIF files are allowed") {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }

  // Handle MongoDB validation errors
  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      error: Object.values(err.errors).map(e => e.message)
    });
  }

  // Handle MongoDB duplicate key errors
  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      message: "Duplicate key error",
      error: `Field ${Object.keys(err.keyValue)} already exists`
    });
  }

  // Handle Cloudinary errors (if any)
  if (err.message.includes("Cloudinary")) {
    return res.status(400).json({
      success: false,
      message: "Cloudinary upload error",
      error: err.message
    });
  }

  // Generic server error
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: err.message
  });
});

module.exports = app;