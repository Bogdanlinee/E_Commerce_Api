const mongoose = require('mongoose');

const SingleCartItem = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  iamge: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  product: {
    type: mongoose.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Please provide product']
  }
});

const OrderSchema = new mongoose.Schema({
  tax: {
    type: Number,
    required: true
  },
  shippingFee: {
    type: Number,
    required: true
  },
  subtotal: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  orderItems: [SingleCartItem],
  status: {
    type: String,
    enum: ['pending', 'failed', 'paid', 'delivered', 'canceled'],
    default: 'pending'
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide user']
  },
  clientSecret: {
    type: String,
    required: true
  },
  paymentId: {
    type: String
  }

}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);