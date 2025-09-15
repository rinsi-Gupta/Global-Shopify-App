const express = require('express');
const router = express.Router();
const { upload, setCouponFolder } = require('../../middleware/uploadImage');
const {
    getAllCoupons,
    createCoupon,
    updateCoupon,
    deleteCoupon
} = require('../../controllers/coupons/CouponController');

router.get('/', getAllCoupons);
router.post('/', setCouponFolder, upload.single('image'), createCoupon);
router.put('/:id', setCouponFolder, upload.single('image'), updateCoupon);
router.delete('/:id', deleteCoupon);

module.exports = router;