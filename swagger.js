const swaggerJsdoc = require('swagger-jsdoc');
const path = require('./src/routers/user')
const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Friend Relation API',
      version: '1.0.0',
      description: 'API for managing friend relations',
    },
    servers: [
      {
        url: 'http://localhost:4000', // Replace with your server's base URL
        description: 'Development server',
      },
    ],
    components: {
        schemas: {
          User: {
            type: 'object',
            properties: {
              username: {
                type: 'string',
                description: 'Username of the user',
              },
              email: {
                type: 'string',
                description: 'Email of the user',
              },
              password: {
                type: 'string',
                description: 'Email of the user',
              },
            },
          },
        },
    },
  },
  apis: ['./src/routers/user.js'], 
};

const specs = swaggerJsdoc(options);

module.exports = specs;
