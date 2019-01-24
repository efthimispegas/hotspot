'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Hotspot = new _mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  hotspotDate: {
    type: Date
  },
  location: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: '_Location'
  }
}, {
  timestamps: true
}, {
  usePushEach: true
});

exports.default = _mongoose2.default.model('Hotspot', Hotspot);