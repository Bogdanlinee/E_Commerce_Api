const { UnauthenticatedError } = require('../errors/index');
const { isTokenValid } = require('../utils/jwt');

const auth = (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) {
    throw new UnauthenticatedError('Authentication failed');
  }

  try {
    const payload = isTokenValid({ token });
    req.user = { name: payload.name, userId: payload.userId, role: payload.role }
    next();
  } catch (error) {
    throw new UnauthenticatedError('Authentication failed');
  }
}

module.exports = { auth };