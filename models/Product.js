const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide product name.'],
    maxLength: [100, 'Name can not be more than 100 characters.']
  },
  price: {
    type: Number,
    required: [true, 'Please provide product price.'],
    default: 0
  },
  description: {
    type: String,
    required: [true, 'Please provide product description.'],
    maxLength: [100, 'Description can not be more than 1000 characters.']
  },
  image: {
    type: String,
    default: '/uploads/example.jpeg'
  },
  category: {
    type: String,
    required: [true, 'Please provide product category.'],
    enum: ['office', 'kitchen', 'bedroom']
  },
  company: {
    type: String,
    required: [true, 'Please provide product company.'],
    enum: {
      values: ['ikea', 'liddy', 'marcos'],
      message: '{VALUE} is not supported'
    }
  },
  colors: {
    type: [],
    required: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  freeShipping: {
    type: Boolean,
    default: false
  },
  inventory: {
    type: Number,
    required: true,
    default: 15
  },
  averageRating: {
    type: Number,
    default: 0
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide user']
  },
}, { timestamps: true });

module.exporst = mongoose.model('Products', ProductSchema);