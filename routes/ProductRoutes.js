const { AuthMiddleware } = require('../middleware');
const { ProductCtrl } = require('../controllers');

class ProductRoutes {
  static route(router) {
    /**
     * @route POST /product/:id/comment
     * @group Product
     * @produces application/json
     * @returns {Comment.model} 201
     * @returns {Error} 400 - client side error
     * @returns {Error} 500 - internal server error
     * @security JWT
     */
    router
      .route('/product/:id/comment')
      .post(AuthMiddleware.authenticate, ProductCtrl.createComment);
    /**
     * @route POST /product
     * @group Product
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
    router.route('/product/:id').post(ProductCtrl.getProduct);
    /**
     * @route GET /products
     * @group Product
     * @produces application/json
     * @returns {[Product.model]} 201
     * @returns {Error} 400 - client side error
     * @returns {Error} 500 - internal server error
     */
    router.route('/products').post(ProductCtrl.getAllProducts);
  }
}

module.exports = ProductRoutes;
