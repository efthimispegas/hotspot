'use strict';

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportJwt = require('passport-jwt');

var _models = require('../models');

var _config = require('../config/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * JWT Strategy
 */

const jwtOpts = {
  //Tell passport to take the jwt token from Authorization headers
  jwtFromRequest: _passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
  secretOrKey: _config2.default.JWT_SECRET
};

const jwtStrategy = new _passportJwt.Strategy(jwtOpts, async (jwt_payload, done) => {
  try {
    const user = await _models.User.findById(jwt_payload.id);

    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (e) {
    return done(e, false);
  }
});

_passport2.default.use(jwtStrategy);