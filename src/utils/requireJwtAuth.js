import passport from 'passport';

import './passport';

export const requireJwtAuth = passport.authenticate('jwt', { session: false });
