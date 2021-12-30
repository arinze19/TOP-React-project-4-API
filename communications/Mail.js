const Mailgun = require('mailgun-js');
const Config = require('../config');

const mailgun = new Mailgun({
  apiKey: Config.mailgun.apiKey,
  domain: Config.mailgun.domain,
});

class Mail {
  static async send(payload) {
    try {
      await mailgun.messages().send(payload);
      console.log(`sent successfully ${payload.to}`)
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = Mail;
