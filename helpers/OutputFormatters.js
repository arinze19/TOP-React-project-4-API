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
      comments: product.comments.map(comment => this.formatComment(comment))
    }
  }

  static formatComment(comment) {
    return {
      id: comment._id,
      user: comment.user,
      remark: comment.remark,
      comment: comment.comment,
      star: comment.star,
      date: comment.date
    }
  }
}

module.exports = OutputFormatters;
