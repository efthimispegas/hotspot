import { Router } from 'express';
import { UserController } from '../controllers';

const UserRoutes = new Router();

//POST requests
UserRoutes.post('/users/auth0', UserController.loginWithAuth0);

export default UserRoutes;
