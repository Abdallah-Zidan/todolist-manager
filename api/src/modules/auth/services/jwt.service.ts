import jwt from 'jsonwebtoken';
import { provide } from 'inversify-binding-decorators';

import config from '../../../core/config';
import sessionManager from '../../../core/session';


@provide(JWTService)
export class JWTService {
  private generateAccessToken(user: JWTPayload) {
    return jwt.sign(user, config.tokens.jwtSecret, {
      expiresIn: config.tokens.tokenExpiry,
    });
  }

  private async generateRefreshToken(user: JWTPayload) {
    const sessionId = await sessionManager.saveSession(user, durationToSeconds(config.tokens.refreshTokenExpiry));

    return jwt.sign({ sessionId, _id: user._id }, config.tokens.refreshJwtSecret, {
      expiresIn: config.tokens.refreshTokenExpiry,
    });
  }

  async generateTokens(user: JWTPayload) {
    return [
      this.generateAccessToken(user),
      await this.generateRefreshToken(user),
    ];
  }

  async refreshTokens(user: JWTPayload,oldSession:string){
    await sessionManager.deleteSession(oldSession);
    return [
      this.generateAccessToken(user),
      await this.generateRefreshToken(user),
    ];
  }
}

export interface JWTPayload {
  _id: string;
  name: string;
  email: string;
  sessionId?: string;
}

function durationToSeconds(duration: string) {
  const durationType = duration.charAt(duration.length - 1);
  if (!durationType) return 0;
  switch (durationType.toLowerCase()) {
    case 'h':
      return Number(duration.substring(0, duration.length - 1)) * 60 * 60;
    case 'd':
      return Number(duration.substring(0, duration.length - 1)) * 24 * 60 * 60;
    case 'm':
      return Number(duration.substring(0, duration.length - 1)) * 30 * 24 * 60 * 60;
    case 'y':
      return Number(duration.substring(0, duration.length - 1)) * 12 * 30 * 24 * 60 * 60;
    default:
      return 0;
  }
}