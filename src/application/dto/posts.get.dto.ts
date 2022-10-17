import { ApiProperty } from '@nestjs/swagger';

export default class PostsGetDTO {
  @ApiProperty({ example: '0', required: true })
  offset: number;

  @ApiProperty({ example: '10', required: true })
  limit: number;
}
