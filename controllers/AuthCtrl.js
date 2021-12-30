const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Config = require('../config');
const { Mail } = require('../communications');
const { EmailHelpers } = require('../helpers')
const { User } = require('../models');
const { ErrorHandler } = require('../helpers/ErrorHelpers');
const { OutputFormatters } = require('../helpers');

class AuthCtrl {
  static generateToken(user) {
    return jwt.sign(
      {
        id: user._id,
        email: user.email,
        name: user.name,
      },
      Config.secret
    );
  }

  static async signUp(req, res, next) {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      return next(new ErrorHandler('User already exists', 409));
    }

    user = new User({ name, email, password });
    await user.save();

    const payload = EmailHelpers.getVerificationEmail(user);
    Mail.send(payload);

    res.status(201).send({
      data: {
        token: AuthCtrl.generateToken(user),
        user: OutputFormatters.formatUser(user),
      },
    });
  }

  static async signIn(req, res, next) {
    const { email, password } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      return next(
        new ErrorHandler(
          'Sorry, looks like you do not have an account with us',
          404
        )
      );
    }
    const valid = bcrypt.compare(String(password), user.password);

    if (!valid) {
      return next(new ErrorHandler('Username or password is invaid', 401));
    }

    res.status(200).send({
      data: {
        token: AuthCtrl.generateToken(user),
        user: OutputFormatters.formatUser(user),
      },
    });
  }

  static test(req, res, next) {
    res.send({ message: 'hello' });
  }
}

module.exports = AuthCtrl;
