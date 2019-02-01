'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongoosePaginate = require('mongoose-paginate');

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const User = new _mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  avatar: {
    filename: { type: String },
    path: { type: String }
  },
  country_id: { type: String },
  public: { type: Boolean, default: true },
  gender: String
}, { collection: 'users' });

User.plugin(_mongoosePaginate2.default);

exports.default = _mongoose2.default.model('User', User);