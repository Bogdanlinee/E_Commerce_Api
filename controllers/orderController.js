const Product = require('../models/Product');
const Order = require('../models/Order');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors/index');
const { checkPermissions } = require('../utils/index');

const createOrder = async (req, res) => {
  const { items: cartItems, tax, shippingFee } = req.body;

  if (!cartItems || cartItems.length === 0) {
    throw new CustomError.BadRequestError('No cart items provided!');
  }

  if (!tax || !shippingFee) {
    throw new CustomError.BadRequestError('Please provide tax and shipping fee!');
  }

  let orderItems = [];
  let subTotal = 0;

  for (const item of cartItems) {
    const dbProduct = await Product.findOne({ _id: item.product });

    if (!dbProduct) {
      throw new CustomError.NotFoundError(`No product with id ${item.product}`);
    }

    const { name, price, image, _id } = dbProduct;
    const singleOrderItem = {
      amount: item.amount,
      name,
      price,
      image,
      product: _id
    };

    orderItems.push(singleOrderItem);
    subTotal += item.amount * price;
  }

  res.send('createOrder');
}
const getAllOrders = async (req, res) => {
  res.send('getAllOrders');
}
const getSingleOrder = async (req, res) => {
  res.send('getSingleOrder');
}
const getCurrentUserOrders = async (req, res) => {
  res.send('getCurrentUserOrders');
}
const updateOrder = async (req, res) => {
  res.send('updateOrder');
}

module.exports = { getAllOrders, getSingleOrder, getCurrentUserOrders, createOrder, updateOrder }