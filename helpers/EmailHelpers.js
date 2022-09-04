const jwt = require('jsonwebtoken');
const Config = require('../config/index');
const Handlebars = require('handlebars');
const path = require('path')
const fs = require('fs');


class EmailHelpers {
  static getForgotPassword(user) {
    const code = EmailHelpers.generateCode();
    const templateName = 'forgotPassword'

    return {
      from: EmailHelpers.getSender(),
      to: user.email,
      subject: 'Forgot Password?',
      html: EmailHelpers.generateHtml(templateName, { code })
    };
  }

  static getVerificationEmail(user) {
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      Config.secret,
      {
        expiresIn: '1d',
      }
    );
    const url = `${Config.staging.link}/verification/confirm-email/${token}`;
    const templateName = 'verifyEmail';

    return {
      from: EmailHelpers.getSender(),
      to: user.email,
      subject: 'Action Required: Please confirm your email',
      html: EmailHelpers.generateHtml(templateName, { name: user.name, verificationLink: url })
    };
  }

  static getSender(sender = undefined) {
    return `Octane <${sender || Config.emailSenders.help}>`;
  }

  static generateCode(codeLength = 6) {
    let resetCode = '';

    for (let i = 0; i < codeLength; i++) {
      resetCode += Math.floor(Math.random() * 10);
    }

    return parseInt(resetCode);
  }

  static getNewsletterWelcomeEmail(email) {
    const templateName = 'newsletterSubscribe';

    return {
      from: EmailHelpers.getSender(),
      to: email,
      subject: 'Welcome to The Official Octane Newsletter 🧪',
      html: EmailHelpers.generateHtml(templateName)
    };
  }

  static generateHtml(templateName, payload) {
    const baseEmailTemplateString = fs.readFileSync(path.join(path.dirname(__dirname), 'communications', 'templates', 'baseEmailTemplate.hbs'), 'utf8');
    const baseEmailTemplate = Handlebars.compile(baseEmailTemplateString);

    const templateString = fs.readFileSync(path.join(path.dirname(__dirname), 'communications', 'templates', `${templateName}Template.hbs`), 'utf8');
    const template = Handlebars.compile(templateString);

    const body = template(payload);
    return baseEmailTemplate({ body });
  }
}

module.exports = EmailHelpers;
