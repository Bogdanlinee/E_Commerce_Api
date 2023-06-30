const User = require('../models/User');

const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  const userData = { name, email, password, };
  if (role) {
    userData.role = role;
  }

  const user = await User.create(userData);
  console.log(user);
  res.json(user);
}
const login = async (req, res) => {
  res.send('login')
}
const logout = async (req, res) => {
  res.send('logoutsome string value')
}

module.exports = { register, login, logout }