'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _controllers = require('../controllers');

const UserRoutes = new _express.Router();

//POST requests
UserRoutes.post('/users/auth0', _controllers.UserController.loginWithAuth0);

exports.default = UserRoutes;