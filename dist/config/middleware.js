'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _serveFavicon = require('serve-favicon');

var _serveFavicon2 = _interopRequireDefault(_serveFavicon);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _monk = require('monk');

var _monk2 = _interopRequireDefault(_monk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const db = (0, _monk2.default)('localhost:27017/hotspot');

exports.default = app => {
  app.use(_bodyParser2.default.json({ limit: '4mb' }));
  app.use(_bodyParser2.default.urlencoded({ limit: '4mb', extended: false }));
  app.use((0, _morgan2.default)('dev'));
  app.use(_passport2.default.initialize());
  app.use(_express2.default.static(_path2.default.join(__dirname, '../public')));
  //we're adding db object to every HTTP request our app makes
  app.use(function (req, res, next) {
    req.db = db;
    next();
  });
  app.set('view engine', 'pug');
  app.set('views', _path2.default.join(__dirname, '../views'));

  app.use((0, _cookieParser2.default)());
  // uncomment after placing your favicon in /public
  //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
};