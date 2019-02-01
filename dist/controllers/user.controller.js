'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllUsers = exports.loginWithAuth0 = exports.updateUser = exports.createUser = exports.getUser = undefined;

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _createToken = require('../utils/createToken');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getUser = exports.getUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const foundUser = await _user2.default.findById(userId);
    if (!foundUser) {
      return res.status(400).json({
        error: true,
        message: `Requested user with id - ${userId} could not be found!`
      });
    }

    return res.status(200).json({
      success: true,
      message: `Requested user with id - ${userId} was found!`,
      user: foundUser
    });
  } catch (e) {
    return res.status(400).json({
      error: true,
      message: 'Error with fetching user',
      details: e
    });
  }
};

const createUser = exports.createUser = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const user = new _user2.default({ email, password, username });
    await user.save();
    return res.status(200).json({
      success: true,
      message: `User with id - ${user.id} was created!`,
      user
    });
  } catch (e) {
    return res.status(400).json({
      error: true,
      message: 'Error with updating user',
      details: e
    });
  }
};

const updateUser = exports.updateUser = async (req, res) => {
  const { userId } = req.params;
  console.log('===============');
  console.log('user: \n', req.body);
  console.log('===============');
  const update = req.body;
  const options = {
    returnNewDocument: true,
    new: true,
    upsert: true,
    runValidators: true
  };
  try {
    await _user2.default.findByIdAndUpdate(userId, update, options, function (err, result) {
      if (err) {
        return res.status(400).json({
          success: false,
          messsage: `Error when trying to find and update user with id - ${userId}`,
          details: err
        });
      }
      return res.status(200).json({
        success: true,
        message: `User with id - ${userId} was updated!`,
        user: result
      });
    });
  } catch (e) {
    return res.status(400).json({
      error: true,
      message: 'Error with updating user',
      details: e
    });
  }
};

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