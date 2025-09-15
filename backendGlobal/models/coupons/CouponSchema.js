const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  code: { type: String, required: true, unique: true, trim: true },
  image: {
    type: String,
    required: false,
    validate: {
      validator: function (v) {
        if (!v) return true;
        return /^(https?:\/\/[^\s$.?#].[^\s]*)$/.test(v);
      },
      message: props => `${props.value} is not a valid URL!`
    }
  },
  category: { type: String, required: true, enum: ['trending', 'discount', 'expiring'] },
  expiry: { type: Date, required: true },
  link: { type: String, required: true, trim: true }
}, { timestamps: true });

module.exports = mongoose.model('Coupon', couponSchema);