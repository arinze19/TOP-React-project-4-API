const { Booking } = require('../models');
const { ErrorHandler } = require('../helpers/ErrorHelpers');

class BookingCtrl {
    static async verify(req, res, next) {
        const { pin } = req.body;

        const booking = await Booking.findOne({ pin });

        if (!booking) {
            return next(new ErrorHandler('Sorry, this code does not exist', 404))
        }

        if (booking.status === 'expired') {
            return next(new ErrorHandler('Sorry this gift card is expired', 410))
        }

        res.status(200).send({
            giftCard: booking
        })
    }
}

module.exports = BookingCtrl;
