const AuthMiddleware = require('./AuthMiddleware');
const ProductMiddleware = require('./ProductMiddleware');
const RateLimitMiddleware = require('./RateLimitMiddleware');

module.exports = {
  AuthMiddleware,
  ProductMiddleware,
  RateLimitMiddleware,
};
