const AuthRoutes = require('./AuthRoutes');
const ProductRoutes = require('./ProductRoutes');
const StaticRoutes = require('./StaticRoutes');

class Routes {
  static route(router) {
    AuthRoutes.route(router);
    ProductRoutes.route(router);
    StaticRoutes.route(router);

    return router;
  }
}

module.exports = Routes;
