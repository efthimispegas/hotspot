'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongoosePaginate = require('mongoose-paginate');

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Hotspot = new _mongoose.Schema({
  text: { type: String, required: true },
  description: { type: String, required: true },
  loc: {
    lng: { type: Number },
    lat: { type: Number }
  },
  city: { type: String },
  country: { type: String },
  validity: { type: Number },
  valid: { type: Boolean, default: true },
  file: { type: Object },
  views_count: { type: Number },
  comments_count: { type: Number },
  user: {
    id: { type: String },
    username: { type: String }
  },
  created_at: { type: Date }
}, { collection: 'hotspots' });

Hotspot.plugin(_mongoosePaginate2.default);

exports.default = _mongoose2.default.model('Hotspot', Hotspot);