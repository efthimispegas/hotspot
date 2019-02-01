'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongodb = require('mongodb');

var _mongodb2 = _interopRequireDefault(_mongodb);

var _express = require('express');

var _controllers = require('../controllers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const UserRoutes = new _express.Router();

// ================= GET ==================== //
/* Get a User by id */
UserRoutes.get('/users/:userId', _controllers.UserController.getUser);

// ================= PUT ==================== //
/* Update a User */
UserRoutes.put('/users/:userId', _controllers.UserController.updateUser);

// ================= POST ==================== //
UserRoutes.post('/users/auth0', _controllers.UserController.loginWithAuth0);

UserRoutes.post('/users', _controllers.UserController.createUser);

exports.default = UserRoutes;