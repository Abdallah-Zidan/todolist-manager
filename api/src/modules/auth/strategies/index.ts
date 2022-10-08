import passport from 'passport';

import { userJwtStrategy } from './jwt.strategy';
import { refreshTokenStrategy } from './refresh.strategy';
export function registerPassportStrategies(passport: passport.PassportStatic) {
  passport.initialize({
    userProperty: 'user',
  });
  passport.use(userJwtStrategy);
  passport.use(refreshTokenStrategy);
}
