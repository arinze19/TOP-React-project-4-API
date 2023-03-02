const { Product, Comment } = require('../models');
const { ErrorHandler } = require('../helpers/ErrorHelpers');
const { OutputFormatters } = require('../helpers');

class ProductCtrl {
  static async getProduct(req, res, next) {
    const { prodId } = req.params;

    let product = await Product.findById(prodId).populate({
      path: 'comments',
      populate: {
        path: 'user',
        select: 'name',
      },
    });

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
        products: products.map((prod) => OutputFormatters.formatProduct(prod)),
      },
    });
  }

  static async createProduct(req, res, next) {
    let { product } = req.body;

    let prodExist = await Product.findOne({ name: product.name });

    if (prodExist) {
      return next(new ErrorHandler('Sorry, this product already exists', 409));
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
    let { prodId } = req.params;
    let { comment } = req.body;

    let product = await Product.findById(prodId);

    if (!product) {
      return next(new ErrorHandler('Sorry, this product does not exist', 404));
    }

    let newComment = new Comment({
      user: id,
      remark: comment.remark,
      comment: comment.comment,
      star: comment.star,
    });

    product.comments.push(newComment._id);

    await product.save();
    await newComment.save();

    res.status(201).send({ data: newComment });
  }
}

module.exports = ProductCtrl;
