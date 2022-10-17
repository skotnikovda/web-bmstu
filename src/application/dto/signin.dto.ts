import { ApiProperty } from '@nestjs/swagger';

export default class SignInDTO {
  @ApiProperty({ example: 'username', required: true })
  username: string;

  @ApiProperty({ example: 'password', required: true })
  password: string;
}
