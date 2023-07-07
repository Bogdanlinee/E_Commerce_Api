//GetAllUsers and GetSingleUser
const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { NotFoundError } = require('../errors/index');

const getAllUsers = async (req, res) => {
  console.log(req.user);
  const users = await User.find({ role: 'user' }).select('-password');
  res.status(StatusCodes.OK).json({ users })
}
const getSingleUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).select('-password');
  if (!user) {
    throw new NotFoundError(`No user with id ${id}`);
  }
  res.status(StatusCodes.OK).json(user);
}
const showCurrentUser = async (req, res) => {
  res.send('showCurrentUser')
}
const updateUser = async (req, res) => {
  res.send('updateUser')
}
const updateUserPassword = async (req, res) => {
  res.send('updateUserPassword')
}

module.exports = { getAllUsers, getSingleUser, showCurrentUser, updateUser, updateUserPassword };
