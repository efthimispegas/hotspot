'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserController = exports.LocationController = exports.HotspotController = undefined;

var _hotspot = require('./hotspot.controller');

var HotspotController = _interopRequireWildcard(_hotspot);

var _location = require('./location.controller');

var LocationController = _interopRequireWildcard(_location);

var _user = require('./user.controller');

var UserController = _interopRequireWildcard(_user);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.HotspotController = HotspotController;
exports.LocationController = LocationController;
exports.UserController = UserController;