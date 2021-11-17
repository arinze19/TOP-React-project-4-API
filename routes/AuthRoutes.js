class AuthRoutes {
  static route(router) {
    /**
     * @route POST /auth/sign-up
     * @group Authentication
     * @param {SignupRequest} example.body.required
     * @produces application/json 
     * @returns {Error} 400 
     * @returns {Error} 500 - internal server error
     */
    router.route('/auth/sign-up').post()

  }
}

module.exports = AuthRoutes;