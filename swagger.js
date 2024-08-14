const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: "E-Commerce's Documentation",
    description: `Please use this documentation for E-Commerce project </br> if need any help please <a href = ${"https://google.com"}> click here </a>`
  },
  host: '142.93.208.153:4003',
};

const outputFile = './swagger.json';
const routes = ['./src/router/index.js'];

swaggerAutogen(outputFile, routes, doc);

