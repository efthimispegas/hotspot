import mongo from 'mongodb';
import { Router } from 'express';
import passport from 'passport';

import { UserController } from '../controllers';
import { signupSchema, loginSchema, validateBody } from '../helpers';

//we need to import it in order to initialize it
import PassportStrategies from '../utils/passportStrategies';

const UserRoutes = new Router();

// ================= GET ==================== //

/* Get a User by id */
UserRoutes.get('/users/:userId', UserController.getUser);

// ================= PUT ==================== //
/* Update a User */
UserRoutes.put('/users/:userId/edit', UserController.updateUser);

// ================= POST ==================== //

UserRoutes.post('/register', UserController.signup);

UserRoutes.post(
  '/login',
  passport.authenticate('local', { session: false }),
  UserController.login
);

UserRoutes.post('/verify', UserController.verifyAccessToken);

/********************************************** */
/*                  Unused                      */
UserRoutes.get(
  '/oauth/google',
  passport.authenticate('google', { session: false }),
  UserController.googleOAuth
);

UserRoutes.get(
  '/oauth/facebook',
  passport.authenticate('facebook', { session: false }),
  UserController.facebookOAuth
);
/********************************************** */

// test
UserRoutes.get(
  '/secret',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    console.log('I managed to get here!');
  }
);

export default UserRoutes;
