const { BookingCtrl } = require('../controllers');
const { AuthMiddleware } = require('../middleware');


class BookingRoutes {
  static route(router) {
    /**
     * @route POST /booking/verify
     * @group Booking
     * @produces application/json
     * @returns {BookingResponse.model} 201
     * @returns {Error} 400 - client side error
     * @returns {Error} 500 - internal server error
     */
    router.route('/booking/verify').post(BookingCtrl.verify);
    /**
     * @route POST /booking/create
     * @group Booking
     * @produces application/json
     * @returns {BookingResponse.model} 201
     * @returns {Error} 400 - client side error
     * @returns {Error} 500 - internal server error
    */
    router.route('/booking/create').post(AuthMiddleware.authenticate, BookingCtrl.create)
  }
}

module.exports = BookingRoutes;