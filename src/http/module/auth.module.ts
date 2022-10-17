import { Module } from '@nestjs/common';
import AuthService from 'application/auth.service';
import IUserRepository from 'domain/auth/repos/user.repository.interface';
import UserRepository from 'mongo/auth/repos/user.repository';
import AuthController from 'http/controller/auth.controller';
import LocalStrategy from 'http/strategy/local.strategy';
import { JwtService } from '@nestjs/jwt';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'http/constants';
import ForumModule from './forum.module';

@Module({
  imports: [JwtModule, ForumModule],
  controllers: [AuthController],
  providers: [
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    AuthService,
    LocalStrategy,
  ],
})
export default class AuthModule {}
