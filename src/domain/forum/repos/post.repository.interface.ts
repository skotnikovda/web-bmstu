import Post from 'domain/forum/post';
import PostDetails from 'domain/forum/post.details';

export default interface IUserRepository {
  createOne(post: Post): Promise<void>;
  readOne(id: string): Promise<Post>;
  readManyDetails(offset: number, limit: number): Promise<PostDetails[]>;
  commit(): Promise<void>;
}
