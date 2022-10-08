import {
  controller,
  httpDelete,
  httpGet,
  httpPost,
  interfaces, principal,
  request,
  requestBody,
} from 'inversify-express-utils';
import { inject } from 'inversify';
import passport from 'passport';
import { AuthService } from './services/auth.service';
import { createUserSchema, loginUserSchema } from './validations';
import { Request } from 'express';
import z from 'zod';
import { getLocalLogger } from '../../core/logger';
import { registerPassportStrategies } from './strategies';
import { JWTPayload } from './services/jwt.service';
import { UnAuthorizedError } from '../../core/errors';
import { authJwt } from './util';
import { validate } from '../../core/middlewares';

registerPassportStrategies(passport);

@controller('/auth')
export class AuthController implements interfaces.Controller {
  private logger = getLocalLogger(AuthController.name);

  constructor(
    @inject(AuthService) private authService: AuthService,
  ) {
  }

  @httpPost('/login', validate(loginUserSchema))
  private async login(
    @requestBody() loginBody: z.infer<typeof loginUserSchema>,
  ) {
    this.logger.log({
      message: `login attempt for user ${loginBody.email}`,
    });
    return this.authService.login(loginBody);
  }

  @httpPost('/register', validate(createUserSchema))
  private async register(@requestBody() userDto: z.infer<typeof createUserSchema>) {
    this.logger.log({
      message: `registering a new user with email ${userDto.email} and name ${userDto.name}`,
    });
    return this.authService.register(userDto);
  }

  @httpGet('/me', authJwt())
  private async me(@request() req: Request) {
    this.logger.log({
      message: 'get profile',
      meta: {
        userId: (req.user as any).id,
      },
    });
    return req.user;
  }


  @httpGet('/token', passport.authenticate('refresh-jwt', { session: false }))
  private async refreshToken(@request() req: Request) {
    const payload: JWTPayload = req.user as JWTPayload;

    if (!payload.sessionId) throw new UnAuthorizedError();

    this.logger.log({
      message: `refresh tokens for user ${payload.email}`,
    });

    return this.authService.refreshToken(payload._id, payload.sessionId);
  }


  @httpDelete('/logout', passport.authenticate('refresh-jwt', { session: false }))
  private async logout(@request() req: Request) {
    const payload: JWTPayload = req.user as JWTPayload;
    this.logger.log({
      message: `logging out user ${payload.email}`,
    });
    if (!payload.sessionId) throw new UnAuthorizedError();
    return this.authService.logout(payload.sessionId);
  }
}
