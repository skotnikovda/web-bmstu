import { ApiProperty } from '@nestjs/swagger';

export default class SignUpDTO {
  @ApiProperty({ example: 'Daniil Skotnikov', required: true })
  name: string;

  @ApiProperty({ example: 'username', required: true })
  username: string;

  @ApiProperty({ example: 'password', required: true })
  password: string;

  @ApiProperty({ example: '26.06.2001', required: true })
  birthday: Date;
}
