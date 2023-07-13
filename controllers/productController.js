const Product = require('../models/Product');
const { StatusCodes } = require('http-status-codes');
const CustomErrors = require('../errors/index');

const createProduct = async (req, res) => {
  req.body.user = req.user.userId;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
}
const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({ products, count: products.length });
}
const getSingleProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.find({ _id: productId });

  if (product.length === 0) {
    throw new CustomErrors.NotFoundError(`No product found with id : ${productId}`);
  }

  res.status(StatusCodes.OK).json({ product });
}
const updateProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOneAndUpdate({ _id: productId }, req.body, { new: true, runValidators: true });

  if (!product) {
    throw new CustomErrors.NotFoundError(`No product found with id : ${productId}`);
  }

  res.status(StatusCodes.OK).json({ product });
}
const deleteProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOne({ _id: productId });

  if (!product) {
    throw new CustomErrors.NotFoundError(`No product found with id : ${productId}`);
  }

  console.log(product)
  await product.deleteOne()

  res.status(StatusCodes.OK).json({ success: 'Product removed' });
}
const uploadImage = async (req, res) => {
  res.send('uploadImage');
}

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage
}