const StaticCtrl = require('../controllers/StaticCtrl');

class StaticRoutes {
  static route(router) {
    /**
     * @route GET /verification/confirm-email/:token
     * @group Verification
     * @produces application/json
     * @returns {VerificationResponse.model} 201
     * @returns {Error} 400 - client side error
     * @returns {Error} 500 - internal server error
     */
    router.route('/verification/confirm-email/:token').get(StaticCtrl.verifyEmail);
    /**
     * @route POST /verification/forgot-password
     * @group Verification
     * @param {ForgotEmailRequest.model} example.body.required
     * @produces application/json
     * @returns {VerificationResponse.model} 201
     * @returns {Error} 400 - client side error
     * @returns {Error} 500 - internal server error
     */
    router
      .route('/verification/forgot-password')
      .post(StaticCtrl.forgotPassword);
    /**
     * @route POST /newsletter/subscribe
     * @group Verification
     * @produces application/json
     * @returns {VerificationResponse.model} 201
     * @returns {Error} 400 - client side error
     * @returns {Error} 500 - internal server error
     */
    router
      .route('/newsletter/subscribe')
      .post(StaticCtrl.subscribe);
  }
}

module.exports = StaticRoutes;
