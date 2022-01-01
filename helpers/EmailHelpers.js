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
}

module.exports = EmailHelpers;
