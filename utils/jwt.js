const jwt = require('jsonwebtoken');

const createJWT = async (payload) => {
  console.log(payload);
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME });
}

const isTokenValid = async ({ token }) => {
  jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = { createJWT, isTokenValid };