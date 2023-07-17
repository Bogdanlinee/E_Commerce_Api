const Review = require('../models/Review');
const Product = require('../models/Product');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors/index');

const createReview = async (req, res) => {
  const { product: productId } = req.body;
  const isProductValid = await Product.findOne({ _id: productId });
  const alreadySubmitted = await Review.findOne({ user: req.user.userId, product: productId });

  req.body.user = req.user.userId;

  const review = await Review.create(req.body);
  res.status(StatusCodes.OK).json({ review });
}

const getAllReviews = async (req, res) => { res.send('getAllReviews') }
const getSingleReview = async (req, res) => { res.send('getSingleReview') }
const updateReview = async (req, res) => { res.send('updateReview') }
const deleteReview = async (req, res) => { res.send('deleteReview') }

module.exports = { createReview, getAllReviews, getSingleReview, updateReview, deleteReview };