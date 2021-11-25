const { AuthMiddleware } = require('../middleware');
const { ProductCtrl } = require('../controllers');

class ProductRoutes {
  static route(router) {
    /**
     * @route POST /product/:id/comment
     * @group Product
     * @param {PostCommentRequest.model} example.body.required
     * @produces application/json
     * @returns {Comment.model} 201
     * @returns {Error} 400 - client side error
     * @returns {Error} 500 - internal server error
     * @security JWT
     * AuthMiddleware.authenticate, 
     */
    router
      .route('/product/:prodId/comment')
      .post(ProductCtrl.createComment);
    /**
     * @route POST /product
     * @group Product
     * @param {PostProductRequest.model} example.body.required
     * @produces application/json
     * @returns {Product.model} 201
     * @returns {Error} 400 - client side error
     * @returns {Error} 500 - internal server error
     * @security JWT
     */
    router
      .route('/product')
      .post(AuthMiddleware.authenticate, ProductCtrl.createProduct);

    /**
     * @route GET /product/:id
     * @group Product
     * @produces application/json
     * @returns {Product.model} 200
     * @returns {Error} 400 - client side error
     * @returns {Error} 500 - internal server error
     */
    router.route('/product/:prodId').get(ProductCtrl.getProduct);
    /**
     * @route GET /products
     * @group Product
     * @produces application/json
     * @returns {Array.<Product>} 201
     * @returns {Error} 400 - client side error
     * @returns {Error} 500 - internal server error
     */
    router.route('/products').get(ProductCtrl.getAllProducts);
  }
}

module.exports = ProductRoutes;
