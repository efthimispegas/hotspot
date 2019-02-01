import mongo from 'mongodb';
import { Router } from 'express';

import { UserController } from '../controllers';

const UserRoutes = new Router();

// ================= GET ==================== //
/* Get a User by id */
UserRoutes.get('/users/:userId', UserController.getUser);

// ================= PUT ==================== //
/* Update a User */
UserRoutes.put('/users/:userId', UserController.updateUser);

// ================= POST ==================== //
UserRoutes.post('/users/auth0', UserController.loginWithAuth0);

UserRoutes.post('/users', UserController.createUser);

export default UserRoutes;
