const { Product, Comment } = require('../models');
const { ErrorHandler } = require('../helpers/ErrorHelpers');
const { OutputFormatters } = require('../helpers');

class ProductCtrl {
  static async getProduct(req, res, next) {
    const { prodId } = req.body;

    let product = await Product.findById({ id: prodId });

    if (!product) {
      return next(new ErrorHandler('Product does not exist', 404));
    }

    res.status(200).send({
      data: {
        product: OutputFormatters.formatProduct(product),
      },
    });
  }

  static async getAllProducts(req, res, next) {
    let products = await Product.find({});

    res.status(200).send({
      data: {
        products: products.forEach((prod) =>
          OutputFormatters.formatProduct(prod)
        ),
      },
    });
  }

  static async createProduct(req, res, next) {
    let { product } = req.body;

    let prodExist = await Product.find({ name: product.name });

    if (prodExist) {
      return next(new ErrorHandler('Sorry, this product already exists', 401));
    }

    product = new Product({
      name: product.name,
      price: product.price,
      description: product.description,
      availableSizes: product.availableSizes,
      imagesUrl: product.imagesUrl,
    });

    await product.save();
    res.status(201).send({ data: product });
  }

  static async createComment(req, res, next) {
    let { id } = req.user;
    let { comment, prodId } = req.body;

    let product = await Product.find({ id: prodId });

    if (!product) {
      return next(new ErrorHandler('Sorry, this product does not exist', 404));
    }

    const newComment = new Comment({
      user: id,
      remark: comment.remark,
      comment: comment.comment,
      star: comment.star,
    });

    await newComment.save();
    res.status(201).send({ data: newComment })
  }
}

module.exports = ProductCtrl;
