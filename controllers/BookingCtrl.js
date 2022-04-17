const { Booking } = require('../models');
const { ErrorHandler } = require('../helpers/ErrorHelpers');
const { StringHelpers } = require('../helpers');

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
            data: {
                booking
            }
        })
    }

    static async create(req, res, next) {
        const pin = StringHelpers.generateBookingCode();

        const booking = new Booking({ pin })
        await booking.save();

        res.status(201).send({
            data: {
                booking
            }
        })
    }
}

module.exports = BookingCtrl;
