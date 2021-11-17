const AuthRoutes = require('./AuthRoutes');
const ProductRoutes = require('./ProductRoutes');

class Routes {
  static route(router) {
    AuthRoutes.route(router);
    ProductRoutes.route(router);

    return router;
  }
}

module.exports = Routes;
