const User = require('../models/User');
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors/index');
const { createJWT } = require('../utils/index');

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const userData = { name, email, password };
  const isEmailAlreadyExist = await User.findOne({ email });

  // check if the email is already in the system
  if (isEmailAlreadyExist) {
    throw new CustomError.BadRequestError('Email is already exists');
  }

  const isTheFirstUser = await User.countDocuments({}) === 0;
  const role = isTheFirstUser ? 'admin' : 'user';

  userData.role = role;

  const user = await User.create(userData);
  const tokenUser = { name: user.name, userId: user._id, role: user.role, };
  const token = await createJWT({ payload: tokenUser });

  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24)
  })
  res.status(StatusCodes.CREATED).json({ user: tokenUser });
}

const login = async (req, res) => {
  const { name, email, password } = req.body;
  if (email) {
    const user = await User.findOne({ email })
  }
  res.status(StatusCodes.OK).json({ user });
}

const logout = async (req, res) => {
  res.send('logout some string value')
}

module.exports = { register, login, logout }