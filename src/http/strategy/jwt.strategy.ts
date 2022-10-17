import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from 'http/constants';
import Member from 'domain/forum/member';
import ForumService from 'application/forum.service';

@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy) {
  private _forumService: ForumService;

  constructor(forumService: ForumService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
    this._forumService = forumService;
  }

  async validate(payload: any): Promise<Member> {
    const member = await this._forumService.getMember(payload.sub);
    return member;
  }
}
