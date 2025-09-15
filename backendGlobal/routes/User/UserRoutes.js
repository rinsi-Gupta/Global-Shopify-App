const express = require("express");
const router = express.Router();
const { getProfile, updateProfile, getAddresses, addAddress, updateAddress, deleteAddress, signup, signin, logout, deleteAccount } = require("../../controllers/user/UserController");
const auth = require("../../middleware/authMiddleware");
const { upload } = require("../../middleware/uploadImage");

// Routes
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/logout",auth, logout);
router.get("/profile/getprofile", auth, getProfile);
router.put("/profile", auth, upload.single("profileImage"), updateProfile);
router.get("/addresses", auth, getAddresses);
router.post("/addresses", auth, addAddress);
router.put("/addresses/:addressId", auth, updateAddress);
router.delete("/addresses/:addressId", auth, deleteAddress);
router.delete("/delete-account", auth, deleteAccount);

module.exports = router;