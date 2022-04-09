const nodemailer = require('nodemailer')
const Config = require('../config');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: Config.gmail.user,
        pass: Config.gmail.pass
    }
});

class NodeMail {
    static async send(payload) {
        try {
            await transporter.sendMail(payload)
            console.log(`sent successfully ${payload.to}`)
        } catch (error) {
            console.log(error)
        }

    }
}

module.exports = NodeMail;