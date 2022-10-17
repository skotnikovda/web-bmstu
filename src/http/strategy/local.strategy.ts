import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import AuthService from 'application/auth.service';
import User from 'domain/auth/user';

@Injectable()
export default class LocalStrategy extends PassportStrategy(Strategy) {
  private _authService: AuthService;

  constructor(authService: AuthService) {
    super();
    this._authService = authService;
  }

  async validate(username: string, password: string): Promise<User> {
    const user = await this._authService.getUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
