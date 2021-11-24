class OutputFormatters {
  static formatUser(user) {
    return {
      id: user._id,
      name: user.name,
      email: user.email,
    };
  }

  static formatProduct(product) {
    return {
      id: product._id,
      name: product.name,
      price: product.price,
      description: product.description,
      availableSizes: product.availableSizes,
      imagesUrl: product.imagesUrl,
      comments: product.comments,
    };
  }
}

module.exports = OutputFormatters;
