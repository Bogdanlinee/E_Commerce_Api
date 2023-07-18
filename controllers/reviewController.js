const Review = require('../models/Review');
const Product = require('../models/Product');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors/index');

const createReview = async (req, res) => {
  const { product: productId } = req.body;
  const isProductValid = await Product.findOne({ _id: productId });

  if (!isProductValid) {
    throw new CustomError.NotFoundError(`No product with id ${productId}`);
  }

  const alreadySubmitted = await Review.findOne({ user: req.user.userId, product: productId });

  if (alreadySubmitted) {
    throw new CustomError.BadRequestError(`Already submitted review for this product ${productId}`);
  }

  req.body.user = req.user.userId;

  const review = await Review.create(req.body);
  res.status(StatusCodes.OK).json({ review });
}

const getAllReviews = async (req, res) => {
  const reviews = await Review.find();

  if (reviews.length === 0) {
    throw new CustomError.NotFoundError('No reviews yet');
  }

  res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
}

const getSingleReview = async (req, res) => {
  const { id: reviewId } = req.params;
  const review = await Review.findOne({ _id: reviewId });

  if (!review) {
    throw new CustomError.BadRequestError(`No review with id ${reviewId}`);
  }

  res.status(StatusCodes.OK).json({ review });
}

const updateReview = async (req, res) => {
  const { id: reviewId } = req.params;
  const { rating, title, comment } = req.body;
  const review = await Review.findOne({ _id: reviewId });

  if (!review) {
    throw new CustomError.BadRequestError(`No review with id ${reviewId}`);
  }

  if (req.user.userId !== review.user.toString()) {
    throw new CustomError.BadRequestError(`You have no permission to delete review ${reviewId}`);
  }

  const updatedReview = await Review.findOneAndUpdate({ _id: reviewId }, { rating, title, comment }, { new: true, runValidators: true });

  res.status(StatusCodes.OK).json({ updatedReview });
}

const deleteReview = async (req, res) => {
  const { id: reviewId } = req.params;
  const review = await Review.findOne({ _id: reviewId });

  if (!review) {
    throw new CustomError.BadRequestError(`No review with id ${reviewId}`);
  }

  if (req.user.userId !== review.user.toString()) {
    throw new CustomError.BadRequestError(`You have no permission to delete review ${reviewId}`);
  }

  await review.deleteOne({ _id: reviewId });

  res.status(StatusCodes.OK).json({ msg: 'success' });
}

module.exports = { createReview, getAllReviews, getSingleReview, updateReview, deleteReview };