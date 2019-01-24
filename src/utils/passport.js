import passport from 'passport';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';

import { User } from '../models';
import config from '../config/config';

/**
 * JWT Strategy
 */

const jwtOpts = {
  //Tell passport to take the jwt token from Authorization headers
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
  secretOrKey: config.JWT_SECRET
};

const jwtStrategy = new JWTStrategy(jwtOpts, async (jwt_payload, done) => {
  try {
    const user = await User.findById(jwt_payload.id);

    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (e) {
    return done(e, false);
  }
});

passport.use(jwtStrategy);
