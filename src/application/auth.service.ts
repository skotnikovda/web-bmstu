import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { Injectable, Inject } from '@nestjs/common';
import SignUpDTO from './dto/signup.dto';
import User from 'domain/auth/user';
import UserProps from 'domain/auth/user/props';
import IUserRepository from 'domain/auth/repos/user.repository.interface';
import UserName from 'domain/auth/user/name';
import UserPassword from 'domain/auth/user/password';
import ForumService from './forum.service';
import MemberProps from 'domain/forum/member/props';
import MemberID from 'domain/forum/member/id';
import MemberName from 'domain/forum/member/name';
import MemberBirthday from 'domain/forum/member/birthday';

@Injectable()
export default class AuthService {
  private _userRepository: IUserRepository;
  private _jwtService: JwtService;
  private _forumService: ForumService;

  async signup(dto: SignUpDTO) {
    let userProps: UserProps = {
      username: new UserName(dto.username),
      password: new UserPassword(dto.password),
    };
    let user = new User(userProps);
    await this._userRepository.createOne(user);
    const memberId = new MemberID(user.id.value);
    const memberProps: MemberProps = {
      name: new MemberName(dto.name),
      birthday: new MemberBirthday(dto.birthday),
    };
    await this._forumService.createMember(memberProps, memberId);
    await this._userRepository.commit();
  }

  async signin(user: User) {
    const payload = { sub: user.id.value };
    // TODO add normal secret key
    const options: JwtSignOptions = { secret: 'secretKey' };
    let token = this._jwtService.sign(payload, options);
    return {
      access_token: token,
    };
  }

  async getUser(username: string, password: string): Promise<User> {
    const user = await this._userRepository.readOne(username);
    await this._userRepository.commit();
    if (user && user.password.value === password) {
      return user;
    }
    return null;
  }

  constructor(
    @Inject('IUserRepository') userRepository: IUserRepository,
    jwtService: JwtService,
    forumService: ForumService,
  ) {
    this._userRepository = userRepository;
    this._jwtService = jwtService;
    this._forumService = forumService;
  }
}
