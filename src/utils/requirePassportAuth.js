import passport from 'passport';

import './passportStrategies';

export const requireJwtAuth = passport.authenticate('jwt', { session: false });
export const requireLocalAuth = passport.authenticate('local', {
  session: false
});
