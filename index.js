const cors = require('cors');
const express = require('express');
const expressSwaggerGenerator = require('express-swagger-generator');
const mongoose = require('mongoose');
const morgan = require('morgan');

const app = express();
const router = express.Router();
const expressSwagger = expressSwaggerGenerator(app);

const { RateLimitMiddleware } = require("./middleware");

const Config = require('./config');
const Routes = require('./routes');
const Logger = require('./config/logger');

const { handleError } = require('./helpers/ErrorHelpers');

const bootstrap = async () => {
  await mongoose.connect(Config.database.url);
  // Setup middleware
  app.use(morgan('dev'));
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  expressSwagger(Config.swaggerOptions);

  // use rate limiter
  app.use(RateLimitMiddleware.limit);

  // use routes
  app.use('/api/v1', Routes.route(router));

  // handle errors
  app.use((err, req, res, next) => {
    handleError(err, res);
    next();
  });

  app.listen(Config.port);
};

bootstrap().then(() => {
  Logger.log(`Octane API is now running on port ${Config.port}`)
});
