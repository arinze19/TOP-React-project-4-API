const Mailgun = require('mailgun-js');
const Config = require('../config');
const Logger = require('../config/logger');

const mailgun = new Mailgun({
  apiKey: Config.mailgun.apiKey,
  domain: Config.mailgun.domain,
});

class Mail {
  static async send(payload) {
    try {
      await mailgun.messages().send(payload);
      Logger.log(`sent successfully ${payload.to}`)
    } catch (err) {
      Logger.error(err);
    }
  }
}

module.exports = Mail;
