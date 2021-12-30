const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const handlebars = require('handlebars');
const Config = require('../config/index');

class EmailHelpers {
  static getForgotPassword() {}

  static getVerificationEmail(user) {
    const token = jwt.sign(
      {
        email: user.email,
        name: user.name
      },
      process.env.SECRET,
      {
        expiresIn: '1d',
      }
    );
    const url = `${Config.port}/verification/${token}`
    return {
      from: EmailHelpers.getSender(),
      to: emailAddress,
      subject: 'Action Required: Please confirm your email',
      html: `
        Hey there ${user.name},
        Please confirm your email <a href=${url}>here</a>. Thank you and happy shopping!

        Cheers,
        The Octeane Team
      `,
    };
  }

  static getSender(sender = undefined) {
    return `Octane <${sender || Config.emailSenders.help}>`;
  }

  static generateHtml(templateName, payload) {
    const baseEmailTemplateString = fs.readFileSync(
      path.join(
        path.dirname(__dirname),
        'communications',
        'templates',
        'baseEmailTemplate.hbs'
      ),
      'utf8'
    );
    const baseEmailTemplate = handlebars.compile(baseEmailTemplateString);

    const templateString = fs.readFileSync(
      path.join(
        path.dirname(__dirname),
        'communications',
        'templates',
        `${templateName}.hbs`
      ),
      'utf8'
    );
    const template = handlebars.compile(templateString);

    const body = template(payload);
    return baseEmailTemplate({ body });
  }
}

module.exports = EmailHelpers;
