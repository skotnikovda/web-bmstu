import PostDetails from 'domain/forum/post.details';
import { ApiProperty } from '@nestjs/swagger';

export default class PostDetailsDTO {
  constructor(details: PostDetails) {
    this.id = details.id.value;
    this.title = details.title.value;
    this.publicationDate = details.publicationDate.value;
  }
  
  @ApiProperty({ example: 'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX', required: true })
  id: string;

  @ApiProperty({ example: 'The Lorem Ipsum', required: true })
  title: string;

  @ApiProperty({ example: '2001-06-26', required: true })
  publicationDate: Date;
}
