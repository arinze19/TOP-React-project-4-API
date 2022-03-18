const jwt = require('jsonwebtoken');
const Config = require('../config');
const { ErrorHandler } = require('../helpers/ErrorHelpers');

class AuthMiddleware {
  static authenticate(req, res, next) {
    const token = req.headers['x-access-token'] || req.headers['authorization'];

    if (!token) {
      return next(new ErrorHandler('Access Denied. A token is required', 401));
    }

    const indexOfBearer = token.indexOf('Bearer');
    const parsedToken   = indexOfBearer === -1 ? token : token.substr(7, token.length);

    try {
      const decoded = jwt.verify(parsedToken, Config.secret);

      if (!decoded) {
        return next(new ErrorHandler('Access denied. Invalid token.', 401));
      }

      req.user = decoded;
      next();
    } catch (err) {
      return next(new ErrorHandler(err, 500));
    }
  }
}

module.exports = AuthMiddleware;
