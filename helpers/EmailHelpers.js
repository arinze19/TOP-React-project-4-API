const jwt = require('jsonwebtoken');
const Config = require('../config/index');

class EmailHelpers {
  static getForgotPassword(user) {
    const code = EmailHelpers.generateCode();

    return {
      from: EmailHelpers.getSender(),
      to: user.email,
      subject: 'Forgot Password?',
      html: `
          Hello, <br />
          Forgetting passwords sure can be embarrassing but best believe it happens to all of us,  <br />
          here's your code to reset your password <br />
          
          reset code: <b>${code}</b>
          <br />
          <br />
          
          Cheers, <br />
          The Octane Team
      `,
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
    return {
      from: EmailHelpers.getSender(),
      to: user.email,
      subject: 'Action Required: Please confirm your email',
      html: `
          Hey There ${user.name}, <br /> 
          Please confirm your email <a href=${url}>here</a>. 
          Thank you and happy shopping!
          <br />
          <br />
          Cheers, <br />
          The Octane Team
      `,
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
    return {
      from: EmailHelpers.getSender(),
      to: email,
      subject: 'Welcome to The Official Octane Newsletter 😁',
      html: `
        Hey There 👋, 
        <br />
        <br />

        We're pretty excited to have you subscribe to our newsletter. We tend 
        to call members of our community enantiomers and we're overjoyed to have you become the latest enantiomer.
        <br />
        We will use this medium occassionally to keep you in the loop with news, collection releases and promos here at octane
        and we promise not to spam you. until next time, keep being awesome and have an amazing day.
        <br />
        <br />
        Cheers,<br />
        The Octane Team 
      `
    };
  }
}

module.exports = EmailHelpers;
