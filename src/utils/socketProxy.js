const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use('/ws', createProxyMiddleware({ target: 'http://13.124.177.111:8787', ws: true }));
};
