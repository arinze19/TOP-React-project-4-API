const { BookingCtrl } = require('../controllers');


class BookingRoutes {
  static route(router) {
    /**
     * @route POST /booking/verify
     * @group Booking
     * @produces application/json
     * @returns {VerificationResponse.model} 201
     * @returns {Error} 400 - client side error
     * @returns {Error} 500 - internal server error
     */
     router.route('/booking/verify').post(BookingCtrl.verify);
  }
}

module.exports = BookingRoutes;