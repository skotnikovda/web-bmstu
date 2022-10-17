import PostID from './post/id';
import Title from './post/title';
import PublicationDate from './post/publication.date';

export default interface PostDetails {
  id: PostID;
  title: Title;
  publicationDate: PublicationDate;
}
