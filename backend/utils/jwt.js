const jwt = require('jsonwebtoken');
const config = require('./config');

const signToken = (payload) => {
  return jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn
  });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, config.jwt.secret);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

const decodeToken = (token) => {
  return jwt.decode(token);
};

module.exports = {
  signToken,
  verifyToken,
  decodeToken
};
