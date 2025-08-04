const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
  shade: String,
  size: String,
  finish: String,
  price: { type: Number, required: true },
  stock: Number,
  images: [String]
}, { _id: false });

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  description: String,
  variants: [variantSchema]
});

module.exports = mongoose.model('Product', productSchema);
