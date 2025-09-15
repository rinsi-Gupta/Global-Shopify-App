const User = require("../../models/user/UserSchema");
const { hashPassword, comparePassword } = require("../../helpers/Password");
const { generateToken } = require("../../helpers/Jwt");
const { successResponse, errorResponse } = require("../../helpers/Response");

// ========== Signup ==========
exports.signup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      gender,
      email,
      mobileNumber,
      password,
      confirmPassword,
    } = req.body;

    // Validate fields
    if (
      !firstName ||
      !lastName ||
      !gender ||
      !email ||
      !mobileNumber ||
      !password ||
      !confirmPassword
    ) {
      return errorResponse(res, "All fields are required", {}, 400);
    }

    if (password !== confirmPassword) {
      return errorResponse(res, "Passwords do not match", {}, 400);
    }

    // Check if user exists
    const userExists = await User.findOne({ email, deletedAt: null });
    if (userExists) {
      return errorResponse(res, "User already exists", {}, 400);
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await User.create({
      firstName,
      lastName,
      gender,
      email,
      mobileNumber,
      password: hashedPassword,
    });

    return successResponse(res, "User registered successfully", {
      token: generateToken(user._id),
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        gender: user.gender,
        email: user.email,
        mobileNumber: user.mobileNumber,
        profileImage: user.profileImage || "",
      },
    }, 201);
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Signup Error:`, error);
    return errorResponse(res, "Server error during signup", { error: error.message }, 500);
  }
};

// ========== Signin ==========
exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return errorResponse(res, "Email and password are required", {}, 400);
    }

    // Find user and check if not deleted
    const user = await User.findOne({ email, deletedAt: null });
    if (!user) {
      return errorResponse(res, "Account not found or has been deleted. Please sign up.", {}, 401);
    }

    // Compare password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return errorResponse(res, "Invalid email or password", {}, 401);
    }

    // Generate token
    const token = generateToken(user._id);

    return successResponse(res, "Login successful", {
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        gender: user.gender,
        email: user.email,
        mobileNumber: user.mobileNumber,
        profileImage: user.profileImage || "",
      },
    }, 200);
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Signin Error:`, error);
    return errorResponse(res, "Server error during signin", { error: error.message }, 500);
  }
};

// ========== Logout ==========
exports.logout = async (req, res) => {
  try {
    return successResponse(res, "Logged out successfully", {}, 200);
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Logout Error:`, error);
    return errorResponse(res, "Server error during logout", { error: error.message }, 500);
  }
};

// ========== Get Profile ==========
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user || user.deletedAt) {
      return errorResponse(res, "User not found or deleted", {}, 404);
    }
    return successResponse(res, "Profile fetched successfully", {
      user: {
        id: user._id,
        firstName: user.firstName || "User",
        lastName: user.lastName || "",
        email: user.email || "",
        mobileNumber: user.mobileNumber || "",
        gender: user.gender || "",
        dob: user.dob || "",
        location: user.location || "",
        alternateMobile: user.alternateMobile || "",
        profileImage: user.profileImage || "",
        addresses: user.addresses || [],
      },
    }, 200);
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Get Profile Error:`, error);
    return errorResponse(res, "Server error during profile fetch", { error: error.message }, 500);
  }
};

// ========== Update Profile ==========
exports.updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, mobileNumber, email, gender, dob, location, alternateMobile } = req.body;
    const profileImage = req.file ? req.file.path : req.body.profileImage;

    // Validate fields
    if (firstName && !firstName.trim()) {
      return errorResponse(res, "First Name cannot be empty", {}, 400);
    }

    if (lastName && !lastName.trim()) {
      return errorResponse(res, "Last Name cannot be empty", {}, 400);
    }

    if (mobileNumber && !/^[0-9]{10}$/.test(mobileNumber)) {
      return errorResponse(res, "Mobile Number must be a 10-digit number", {}, 400);
    }

    if (alternateMobile && !/^[0-9]{10}$/.test(alternateMobile)) {
      return errorResponse(res, "Alternate Mobile Number must be a 10-digit number", {}, 400);
    }

    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2})?$/;
      if (!emailRegex.test(email)) {
        return errorResponse(res, "Please enter a valid Email ID (e.g., example@domain.com)", {}, 400);
      }
    }

    if (profileImage && !req.file && !/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp))$/i.test(profileImage)) {
      return errorResponse(res, "Invalid profile image URL", {}, 400);
    }

    if (dob) {
      const dobDate = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - dobDate.getFullYear();
      const monthDiff = today.getMonth() - dobDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
        age--;
      }
      if (age < 18) {
        return errorResponse(res, "You must be at least 18 years old", {}, 400);
      }
    }

    const user = await User.findById(req.user.id);
    if (!user || user.deletedAt) {
      return errorResponse(res, "User not found or deleted", {}, 404);
    }

    const updateData = {};
    if (firstName) updateData.firstName = firstName;
    if (lastName !== undefined) updateData.lastName = lastName || "";
    if (mobileNumber) updateData.mobileNumber = mobileNumber;
    if (email) updateData.email = email;
    if (gender) updateData.gender = gender;
    if (dob !== undefined) updateData.dob = dob;
    if (location !== undefined) updateData.location = location;
    if (alternateMobile !== undefined) updateData.alternateMobile = alternateMobile;
    if (profileImage !== undefined) updateData.profileImage = profileImage;

    await User.updateOne({ _id: req.user.id }, { $set: updateData }, { runValidators: true });

    const updatedUser = await User.findById(req.user.id).select("-password");
    return successResponse(res, "Profile updated successfully", {
      user: {
        id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        mobileNumber: updatedUser.mobileNumber,
        gender: updatedUser.gender,
        dob: updatedUser.dob,
        location: updatedUser.location,
        alternateMobile: updatedUser.alternateMobile,
        profileImage: updatedUser.profileImage || "",
        addresses: updatedUser.addresses || [],
      },
    }, 200);
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Update Profile Error:`, error);
    return errorResponse(res, "Server error during profile update", { error: error.message }, 500);
  }
};

// ========== Get Addresses ==========
exports.getAddresses = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("addresses");
    if (!user || user.deletedAt) {
      return errorResponse(res, "User not found or deleted", {}, 404);
    }
    return successResponse(res, "Addresses fetched successfully", { addresses: user.addresses || [] }, 200);
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Get Addresses Error:`, error);
    return errorResponse(res, "Server error during addresses fetch", { error: error.message }, 500);
  }
};

// ========== Add Address ==========
exports.addAddress = async (req, res) => {
  try {
    const { name, street, city, pincode, state, mobile, type, isDefault } = req.body;

    if (!name || !street || !city || !pincode || !state || !mobile || !type) {
      return errorResponse(res, "All fields are required", {}, 400);
    }

    if (!/^[0-9]{6}$/.test(pincode)) {
      return errorResponse(res, "Pincode must be a 6-digit number", {}, 400);
    }

    if (!/^[0-9]{10}$/.test(mobile)) {
      return errorResponse(res, "Mobile number must be a 10-digit number", {}, 400);
    }

    if (!["Home", "Work", "Other"].includes(type)) {
      return errorResponse(res, "Type must be Home, Work, or Other", {}, 400);
    }

    const user = await User.findById(req.user.id);
    if (!user || user.deletedAt) {
      return errorResponse(res, "User not found or deleted", {}, 404);
    }

    const newAddress = { name, street, city, pincode, state, mobile, type, isDefault };

    if (isDefault) {
      user.addresses.forEach((addr) => (addr.isDefault = false));
    }

    user.addresses.push(newAddress);
    await user.save();

    return successResponse(res, "Address added successfully", { address: newAddress }, 201);
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Add Address Error:`, error);
    return errorResponse(res, "Server error during address addition", { error: error.message }, 500);
  }
};

// ========== Update Address ==========
exports.updateAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    const { name, street, city, pincode, state, mobile, type, isDefault } = req.body;

    if (!name || !street || !city || !pincode || !state || !mobile || !type) {
      return errorResponse(res, "All fields are required", {}, 400);
    }

    if (!/^[0-9]{6}$/.test(pincode)) {
      return errorResponse(res, "Pincode must be a 6-digit number", {}, 400);
    }

    if (!/^[0-9]{10}$/.test(mobile)) {
      return errorResponse(res, "Mobile number must be a 10-digit number", {}, 400);
    }

    if (!["Home", "Work", "Other"].includes(type)) {
      return errorResponse(res, "Type must be Home, Work, or Other", {}, 400);
    }

    const user = await User.findById(req.user.id);
    if (!user || user.deletedAt) {
      return errorResponse(res, "User not found or deleted", {}, 404);
    }

    const address = user.addresses.id(addressId);
    if (!address) {
      return errorResponse(res, "Address not found", {}, 404);
    }

    address.name = name;
    address.street = street;
    address.city = city;
    address.pincode = pincode;
    address.state = state;
    address.mobile = mobile;
    address.type = type;

    if (isDefault) {
      user.addresses.forEach((addr) => (addr.isDefault = addr._id.toString() === addressId));
    } else if (address.isDefault && !isDefault) {
      address.isDefault = false;
    }

    await user.save();

    return successResponse(res, "Address updated successfully", { address }, 200);
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Update Address Error:`, error);
    return errorResponse(res, "Server error during address update", { error: error.message }, 500);
  }
};

// ========== Delete Address ==========
exports.deleteAddress = async (req, res) => {
  try {
    const { addressId } = req.params;

    const user = await User.findById(req.user.id);
    if (!user || user.deletedAt) {
      return errorResponse(res, "User not found or deleted", {}, 404);
    }

    const address = user.addresses.id(addressId);
    if (!address) {
      return errorResponse(res, "Address not found", {}, 404);
    }

    user.addresses.pull(addressId);
    await user.save();

    return successResponse(res, "Address deleted successfully", {}, 200);
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Delete Address Error:`, error);
    return errorResponse(res, "Server error during address deletion", { error: error.message }, 500);
  }
};

// ========== Delete Account ==========
exports.deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findOne({ _id: userId, deletedAt: null });
    if (!user) {
      return errorResponse(res, "User not found or already deleted", {}, 404);
    }
    await User.updateOne({ _id: userId }, { $set: { deletedAt: new Date() } });
    return successResponse(res, "Account deleted successfully", {}, 200);
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Delete Account Error:`, error);
    return errorResponse(res, "Server error during account deletion", { error: error.message }, 500);
  }
};