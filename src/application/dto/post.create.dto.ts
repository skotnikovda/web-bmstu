import { ApiProperty } from '@nestjs/swagger';

export default class PostCreateDTO {
  @ApiProperty({ example: 'The Lorem Ipsum', required: true })
  title: string;

  @ApiProperty({ example: 'Lorem ipsum...', required: true })
  content: string;
}
