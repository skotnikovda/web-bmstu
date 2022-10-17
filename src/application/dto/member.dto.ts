import Member from 'domain/forum/member';
import { ApiProperty } from '@nestjs/swagger';

export default class MemberDTO {
  constructor(member: Member) {
    this.id = member.id.value;
    this.name = member.name.value;
    this.birthday = member.birthday.value;
  }
  
  @ApiProperty({ example: 'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX', required: true })
  id: string;

  @ApiProperty({ example: 'Daniil Skotnikov', required: true })
  name: string;

  @ApiProperty({ example: '2001-06-26', required: true })
  birthday: Date;
}
