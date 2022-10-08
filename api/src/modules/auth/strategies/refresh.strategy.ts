import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import config from '../../../core/config';
import session from '../../../core/session';
const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.tokens.refreshJwtSecret,
};

class RefreshStrategy extends Strategy {
  name = 'refresh-jwt';
}

export const refreshTokenStrategy = new RefreshStrategy(
  options,
  async (payload, done) => {
    try {
      const userSession: any = await session.getSession(payload.sessionId);
      if (!userSession) {
        return done(null, false);
      }
      return done(null, { ...payload ,...userSession});
    } catch (err) {
      return done(err, false);
    }
  },
);