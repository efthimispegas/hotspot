'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllUsers = exports.loginWithAuth0 = undefined;

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _createToken = require('../utils/createToken');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const loginWithAuth0 = exports.loginWithAuth0 = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await _user2.default.create({ email });
    //return 201 for creation
    return res.status(201).json({
      success: true,
      user,
      token: `JWT ${(0, _createToken.createToken)(user)}`
    });
  } catch (e) {
    return res.status(e.status).json({
      error: true,
      message: "Something went wrong with user's auth",
      details: e
    });
  }
};

const getAllUsers = exports.getAllUsers = async (req, res) => {
  const { email } = req.body;

  try {
    return res.status(200).json({
      users: await _user2.default.find()
    });
  } catch (e) {
    return res.status(400).json({
      error: true,
      message: 'Error with getting all users',
      details: e
    });
  }
};