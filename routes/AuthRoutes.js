const { AuthCtrl } = require('../controllers');
const { AuthMiddleware } = require('../middleware');

class AuthRoutes {
  static route(router) {
    /**
     * @route POST /auth/sign-up
     * @group Authentication
     * @param {SignupRequest} example.body.required
     * @produces application/json
     * @returns {AuthResponse.model} 201
     * @returns {Error} 400 - client side error
     * @returns {Error} 500 - internal server error
     * @security JWT
     */
    router.route('/auth/sign-up').post(AuthCtrl.signUp);
    /**
     * @route POST /auth/sign-in
     * @group Authentication
     * @param {SigninRequest} example.body.required
     * @produces application/json
     * @returns {AuthResponse.model} 200
     * @returns {Error} 400 - client side error
     * @returns {Error} 500 - internal server error
     * @security JWT
     */
    router.route('/auth/sign-in').post(AuthMiddleware.authenticate, AuthCtrl.signIn);
    router.route('/test').get(AuthCtrl.test)
  }
}

module.exports = AuthRoutes;
