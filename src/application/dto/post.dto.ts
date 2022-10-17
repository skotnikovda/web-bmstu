import Post from 'domain/forum/post';
import { ApiProperty } from '@nestjs/swagger';

export default class PostDTO {
  constructor(post: Post) {
    this.id = post.id.value;
    this.title = post.title.value;
    this.content = post.content.value;
    this.publicationDate = post.publicationDate.value;
  }
  
  @ApiProperty({ example: 'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX', required: true })
  id: string;

  @ApiProperty({ example: 'The Lorem Ipsum', required: true })
  title: string;

  @ApiProperty({ example: 'Lorem Ipsum...', required: true })
  content: string;

  @ApiProperty({ example: '2001-06-26', required: true })
  publicationDate: Date;
}
