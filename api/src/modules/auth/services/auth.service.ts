import z from 'zod';
import { inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';

import { JWTService } from './jwt.service';
import { userToJSON } from '../user.mappers';
import { HttpError, UnAuthorizedError } from '../../../core/errors';
import sessionManager from '../../../core/session';
import { UserModel } from '../user.model';
import { createUserSchema, loginUserSchema } from '../validations';

@provide(AuthService)
export class AuthService {
  constructor(
    @inject(JWTService) private jwtService: JWTService,
  ) {
  }

  public async login(loginBody: z.infer<typeof loginUserSchema>) {
    const user = await UserModel.findOne({ email: loginBody.email });

    if (!user) {
      throw new HttpError({ code: 422, message: 'Invalid credentials' });
    }

    if (!(await user.comparePassword(loginBody.password))) {
      throw new HttpError({ code: 422, message: 'Invalid credentials' });
    }

    const [accessToken, refreshToken] = await this.jwtService.generateTokens(userToJSON(user));

    return { ...userToJSON(user), accessToken, refreshToken };
  }

  public async logout(sessionId?: string) {
    await sessionManager.deleteSession(sessionId ?? '');
  }

  public async register(userDto: z.infer<typeof createUserSchema>) {
    const user = new UserModel(userDto);
    await user.save();
    return userToJSON(user);
  }

  async refreshToken(userId: string, sessionId: string) {

    const user = await UserModel.findOne({
      _id:userId,
    });

    if(!user) throw new UnAuthorizedError();

    const [accessToken, refreshToken] = await this.jwtService.refreshTokens(userToJSON(user),sessionId);

    return { ...userToJSON(user), accessToken, refreshToken };
  }
}
