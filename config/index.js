const dotenv = require('dotenv').config();
const port = process.env.PORT || 5151; 

const swaggerOptions = {
  swaggerDefinition: {
    title: 'Octane API',
    version: '1.0.0',
    description: 'This is a REST API to serve the Octane ecommerce app',
  },
  host: `localhost:${port}/api/`,
  basePath: '/v1',
  produces: ['application/json'],
  schemes: ['http', 'https'],
  securityDefinitions: {
    JWT: {
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
    },
  },
  servers: [
    {
      url: `http://localhost:${port}`,
      description: 'Local Sever',
    },
  ],
  basedir: __dirname,
  files: ['../routes/*.js'],
};

const config = {
  swaggerOptions,
  port,
  secret: process.env.SECRET,
  database: {
    url: process.env.MONGO_URL,
  },
  emailSenders: {
    help: 'help@octane.io',
    service: 'service@octane.io'
  },
  staging: {
    link: process.env.PORT ? 'https://react-project-4-api.herokuapp.com/api/v1' : `http://localhost:${port}/api/v1`
  },
  mailgun: {
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN
  }
};

module.exports = config;
