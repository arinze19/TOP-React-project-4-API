const { AuthCtrl } = require('../controllers');

class AuthRoutes {
  static route(router) {
    /**
     * @route POST /auth/sign-up
     * @group Authentication
     * @param {SignUpRequest.model} example.body.required
     * @produces application/json
     * @returns {AuthResponse.model} 201
     * @returns {Error} 400 - client side error
     * @returns {Error} 500 - internal server error
     */
    router.route('/auth/sign-up').post(AuthCtrl.signUp);
    /**
     * @route POST /auth/sign-in
     * @group Authentication
     * @param {SignInRequest.model} example.body.required
     * @produces application/json
     * @returns {AuthResponse.model} 200
     * @returns {Error} 400 - client side error
     * @returns {Error} 500 - internal server error
     */
    router.route('/auth/sign-in').post(AuthCtrl.signIn);
  }
}

module.exports = AuthRoutes;
