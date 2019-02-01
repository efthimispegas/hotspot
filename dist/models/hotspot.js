'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

<<<<<<< HEAD
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
=======
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
>>>>>>> exp

exports.default = _mongoose2.default.model('Hotspot', Hotspot);