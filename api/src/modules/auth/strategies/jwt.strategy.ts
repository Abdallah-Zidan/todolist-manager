import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import config from '../../../core/config';

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.tokens.jwtSecret,
};

export const userJwtStrategy = new Strategy(options, async (payload, done) => {
  try {
    return done(null, {
      _id: payload._id,
      name: payload.name,
      email: payload.email,
      sessionId:payload.sessionId
    });
  } catch (err) {
    return done(err, false);
  }
});
