const jwt = require('jsonwebtoken');
const Config = require('../config');
const { Mail } = require('../communications');
const { User, Subscriber } = require('../models');
const { EmailHelpers } = require('../helpers');
const { ErrorHandler } = require('../helpers/ErrorHelpers');

class StaticCtrl {
  static async verifyEmail(req, res, next) {
    const { token } = req.params;
    let decoded;

    try {
      decoded = jwt.verify(token, Config.secret);
    } catch (err) {
      res.send({
        message: 'Sorry, something went wrong. perhaps the link has expired. try requesting for a new one',
      });
      console.log(err);
    }

    const user = await User.findById(decoded.id);
    user.isEmailVerified = true;

    await user.save();
    res.send({
      message: 'All set! Kindly head over to the home page and login',
    });
  }

  static async forgotPassword(req, res, next) {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return next(
        new ErrorHandler(
          'Sorry, looks like you do not have an account with us',
          404
        )
      );
    }

    const payload = EmailHelpers.getForgotPassword(user);
    Mail.send(payload);

    res.send({
      message: 'An email with a reset code has been sent to this email',
    });
  }

  static async subscribe(req, res, next) {
    const { email } = req.body;

    let subscriber = await Subscriber.findOne({ email });

    if(subscriber) {
      return next(
        new ErrorHandler(
          'Ooops,looks like you are already subscribed to our newsletter',
          409
        )
      );
    }

    subscriber = new Subscriber({ email });
    await subscriber.save();

    const payload = EmailHelpers.getNewsletterWelcomeEmail(email);
    Mail.send(payload);

    res.status(200).send({
      message: `Thank you for subscribing to our newsletter, we promise you wont regret it`
    })
  }
}

module.exports = StaticCtrl;
