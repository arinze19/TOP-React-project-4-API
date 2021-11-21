class OutputFormatters {
  static formatUser(user) {
    return {
      id: user._id,
      name: user.name,
      email: user.email,
    };
  }
}

module.exports = OutputFormatters;
