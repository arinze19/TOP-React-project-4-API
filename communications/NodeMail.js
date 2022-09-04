const nodemailer = require('nodemailer')
const InlineCss = require('inline-css');
const Config = require('../config');
const Logger = require('../config/logger');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    service: 'gmail',
    auth: {
        user: Config.gmail.user,
        pass: Config.gmail.pass
    }
});

class NodeMail {
    static async send(payload) {
        try {
            payload.html = await InlineCss(payload.html, { url: ' ' });
            await transporter.sendMail(payload)
            Logger.log(`sent successfully ${payload.to}`)
        } catch (error) {
            Logger.error(error)
        }

    }
}

module.exports = NodeMail;