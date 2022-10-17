import { ApiProperty } from '@nestjs/swagger';

export default class MemberUpdateDTO {
  @ApiProperty({ example: 'Daniil Skotnikov', required: true })
  name: string;

  @ApiProperty({ example: '2001-06-26', required: true })
  birthday: Date;
}
