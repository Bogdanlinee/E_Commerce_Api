const User = require('../models/User');
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors/index');

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const userData = { name, email, password };
  const isEmailAlreadyExist = await User.findOne({ email });

  if (isEmailAlreadyExist) {
    throw new CustomError.BadRequestError('Email is already exists');
  }

  const isTheFirstUser = await User.countDocuments({}) === 0;
  const role = isTheFirstUser ? 'admin' : 'user';

  userData.role = role;

  const user = await User.create(userData);
  res.status(StatusCodes.CREATED).json({ user });
}
const login = async (req, res) => {
  res.send('login')
}
const logout = async (req, res) => {
  res.send('logout some string value')
}

module.exports = { register, login, logout }