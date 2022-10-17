import {
  Controller,
  Req,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import User from 'http/decorators/user.decorator';
import AuthService from 'application/auth.service';
import LocalAuthGuard from 'http/guard/local.auth.guard';
import SignInDTO from 'application/dto/signin.dto';
import SignUpDTO from 'application/dto/signup.dto';
import DomainUser from 'domain/auth/user';

@ApiTags('auth')
@Controller('auth')
export default class AuthController {
  private _service: AuthService;

  constructor(service: AuthService) {
    this._service = service;
  }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  @ApiBody({ type: SignInDTO })
  async signin(@User() user: DomainUser) {
    let token = await this._service.signin(user);
    return token;
  }

  @Post('signup')
  @ApiBody({ type: SignUpDTO })
  async signup(@Body() dto: SignUpDTO) {
    await this._service.signup(dto);
  }
}
