const { Schema, model } = require('mongoose');
const shortId = require('shortid');

const subscriberSchema = new Schema({
    _id: {
        type: String,
        default: shortId.generate,
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
}, 
{
    timestamps: true
});

module.exports = model('Subscriber', subscriberSchema);