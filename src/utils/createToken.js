import jwt from 'jsonwebtoken';

import config from '../config/config';

export const createToken = args =>
  jwt.sign(
    {
      iss: 'hotspot',
      sub: args._id,
      iat: new Date().getTime(), //current time
      exp: new Date().setDate(new Date.getDate() + 1) //current time tomorrow
    },
    config.JWT_SECRET
  );
