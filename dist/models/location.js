'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const _Location = new _mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minLength: [3, 'Name must me at least 3 characters long!']
  },
  description: {
    type: String,
    required: true,
    unique: true,
    minLength: [5, 'Description must me at least 5 characters long!']
  },
  category: {
    type: String
  },
  hotspots: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Hotspot'
  }]
}, { timestamps: true }, {
  usePushEach: true
});

/**
 * Create a hotspot and add it to the particular
 * location's array of hotspots
 */

_Location.statics.addHotspot = async function (id, args) {
  const Hotspot = _mongoose2.default.model('Hotspot');
  //craete a new hotspot with a property of key "locations" and a value of the location's id
  const newHotspot = new Hotspot(Object.assign({}, args, { location: id }));
  //find the location by id and update its hotspots property
  await this.findByIdAndUpdate(id, { $push: { hotspots: newHotspot.id } });
  //finally we save the newly created hotspot and return it
  return {
    hotspot: await newHotspot.save()
  };
};

exports.default = _mongoose2.default.model('_Location', _Location);