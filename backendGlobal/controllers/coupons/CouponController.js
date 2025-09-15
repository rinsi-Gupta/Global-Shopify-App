const Coupon = require('../../models/coupons/CouponSchema');
const cloudinary = require('cloudinary').v2;

exports.getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ expiry: 1 });
    res.status(200).json(coupons);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

exports.createCoupon = async (req, res) => {
  try {
    const { title, code, category, expiry, link, image } = req.body;
    const imageUrl = req.file ? req.file.path : image;
    if (!imageUrl) {
      return res.status(400).json({ success: false, message: 'Image URL or file is required' });
    }
    const coupon = new Coupon({
      title,
      code,
      image: imageUrl,
      category,
      expiry,
      link
    });
    const savedCoupon = await coupon.save();
    res.status(201).json(savedCoupon);
  } catch (err) {
    res.status(400).json({ success: false, message: 'Failed to create coupon', error: err.message });
  }
};

exports.updateCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    if (!coupon) {
      return res.status(404).json({ success: false, message: 'Coupon not found' });
    }
    const { title, code, category, expiry, link, image } = req.body;
    if (title) coupon.title = title;
    if (code) coupon.code = code;
    if (category) coupon.category = category;
    if (expiry) coupon.expiry = expiry;
    if (link) coupon.link = link;
    if (req.file || image) {
      if (coupon.image && coupon.image.includes('cloudinary.com')) {
        const publicId = coupon.image.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`coupon_images/${publicId}`);
      }
      coupon.image = req.file ? req.file.path : image;
    }
    const updatedCoupon = await coupon.save();
    res.status(200).json(updatedCoupon);
  } catch (err) {
    res.status(400).json({ success: false, message: 'Failed to update coupon', error: err.message });
  }
};

exports.deleteCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndDelete(req.params.id);
    if (!coupon) {
      return res.status(404).json({ success: false, message: 'Coupon not found' });
    }
    if (coupon.image && coupon.image.includes('cloudinary.com')) {
      const publicId = coupon.image.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`coupon_images/${publicId}`);
    }
    res.status(200).json({ success: true, message: 'Coupon deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};