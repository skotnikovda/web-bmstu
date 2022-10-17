import PersistenceDetails from 'persistence/post.details';
import DomainDetails from 'domain/forum/post.details';
import PostID from 'domain/forum/post/id';
import Title from 'domain/forum/post/title';
import PublicationDate from 'domain/forum/post/publication.date';

export default class PostDetailsMapper {
  public static toDomain(model: PersistenceDetails): DomainDetails {
    return {
      id: new PostID(model.id),
      title: new Title(model.title),
      publicationDate: new PublicationDate(model.publicationDate),
    };
  }
  public static toPersistence(post: DomainDetails): PersistenceDetails {
    return {
      id: post.id.value,
      title: post.title.value,
      publicationDate: post.publicationDate.value,
    };
  }
}
