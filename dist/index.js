'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _db = require('./config/db');

var _db2 = _interopRequireDefault(_db);

var _middleware = require('./config/middleware');

var _middleware2 = _interopRequireDefault(_middleware);

var _routes = require('./routes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)();

/**
 * Database configuration
 */
(0, _db2.default)();

/**
 * Middleware configuration
 */
(0, _middleware2.default)(app);

app.use('/api', [_routes.HotspotRoutes, _routes.LocationRoutes, _routes.UserRoutes]);

/**
 * Listening on PORT
 */
const PORT = process.env.PORT || 3000;

app.listen(PORT, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`App listening to port: ${PORT}`);
  }
});