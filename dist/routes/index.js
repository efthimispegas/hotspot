'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserRoutes = exports.LocationRoutes = exports.HotspotRoutes = undefined;

var _hotspot = require('./hotspot.routes');

var _hotspot2 = _interopRequireDefault(_hotspot);

var _location = require('./location.routes');

var _location2 = _interopRequireDefault(_location);

var _user = require('./user.routes');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.HotspotRoutes = _hotspot2.default;
exports.LocationRoutes = _location2.default;
exports.UserRoutes = _user2.default;