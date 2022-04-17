const { Schema, model } = require('mongoose');
const shortId = require('shortid');

const bookingSchema = new Schema({
    _id: {
        type: String,
        default: shortId.generate,
    },
    pin: {
        type: String,
        unique: true
    },
    count: {
        type: Number,
        default: 10
    },
    discount: {
        type: Number,
        default: 0.20
    },
    status: {
        type: String,
        enum: ['valid', 'expired'],
        default: 'valid'
    }
});

module.exports = model('Booking', bookingSchema);
