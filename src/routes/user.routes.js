import mongo from 'mongodb';
import { Router } from 'express';
import passport from 'passport';

import { UserController } from '../controllers';
import { signupSchema, loginSchema, validateBody } from '../helpers';

const UserRoutes = new Router();

// ================= GET ==================== //
/* Get a User by id */
UserRoutes.get('/users/:userId', UserController.getUser);

// ================= PUT ==================== //
/* Update a User */
UserRoutes.put('/users/:userId', UserController.updateUser);

// ================= POST ==================== //

UserRoutes.post('/register', validateBody(signupSchema), UserController.signup);

UserRoutes.post(
  '/login',
  validateBody(loginSchema),
  passport.authenticate('jwt', { session: false }),
  UserController.login
);

export default UserRoutes;
