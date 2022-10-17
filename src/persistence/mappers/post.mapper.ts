import PersistencePost from 'persistence/post';
import DomainPost from 'domain/forum/post';
import PostID from 'domain/forum/post/id';
import Title from 'domain/forum/post/title';
import Content from 'domain/forum/post/content';
import PublicationDate from 'domain/forum/post/publication.date';
import PostProps from 'domain/forum/post/props';

export default class PostMapper {
  public static toDomain(model: PersistencePost): DomainPost {
    let props: PostProps = {
      title: new Title(model.title),
      content: new Content(model.content),
      publicationDate: new PublicationDate(model.publicationDate),
    };
    let id: PostID = new PostID(model.id);
    return new DomainPost(props, id);
  }
  public static toPersistence(post: DomainPost): PersistencePost {
    return {
      id: post.id.value,
      title: post.title.value,
      content: post.content.value,
      publicationDate: post.publicationDate.value,
    };
  }
}
