const StaticCtrl = require('../controllers/StaticCtrl');

class StaticRoutes {
  static route(router) {
    router.route('/verification/:token', StaticCtrl);
  }
}

module.exports = StaticRoutes;
