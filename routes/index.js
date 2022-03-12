const AuthRoutes = require('./AuthRoutes');
const Booking = require('./Booking');
const ProductRoutes = require('./ProductRoutes');
const StaticRoutes = require('./StaticRoutes');

class Routes {
  static route(router) {
    AuthRoutes.route(router);
    Booking.route(router);
    ProductRoutes.route(router);
    StaticRoutes.route(router);

    return router;
  }
}

module.exports = Routes;
