import IPostRepository from 'domain/forum/repos/post.repository.interface';
import DomainPost from 'domain/forum/post';
import DomainPostDetails from 'domain/forum/post.details';
import PersistencePost from 'persistence/post';
import PostModel from 'mongo/forum/models/post.model';
import PostDetailsMapper from 'persistence/mappers/post.details.mapper';
import PostMapper from 'persistence/mappers/post.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class MemberRepository implements IPostRepository {
  private postsToCreate: DomainPost[] = [];
  private postsToUpdate: DomainPost[] = [];

  async commit(): Promise<void> {
    this.commitCreated();
    this.commitUpdated();
  }

  async readManyDetails(
    offset: number,
    limit: number,
  ): Promise<DomainPostDetails[]> {
    let postDocs = await PostModel.find()
      .sort({ publicationDate: -1 })
      .skip(offset)
      .limit(limit);
    let posts: DomainPostDetails[] = [];
    for (let postDoc of postDocs) {
      let post = PostDetailsMapper.toDomain(postDoc);
      posts.push(post);
    }
    return posts;
  }

  async createOne(post: DomainPost): Promise<void> {
    this.postsToCreate.push(post);
  }

  async readOne(id: string): Promise<DomainPost> {
    let post = this.readCreated(id);
    if (post) {
      return post;
    }
    let postDoc = await PostModel.findOne({ id: id });
    if (postDoc) {
      let post = PostMapper.toDomain(postDoc);
      this.postsToUpdate.push(post);
      return post;
    }
    return null;
  }

  readCreated(id: string): DomainPost {
    for (let post of this.postsToCreate) {
      if (post.id.value == id) {
        return post;
      }
    }
  }

  async commitCreated(): Promise<void> {
    let postsToCreate: PersistencePost[] = [];
    for (let post of this.postsToCreate) {
      postsToCreate.push(PostMapper.toPersistence(post));
    }
    this.postsToCreate = [];
    await PostModel.insertMany(postsToCreate);
  }

  async commitUpdated(): Promise<void> {
    for (let post of this.postsToUpdate) {
      let postDoc = PostMapper.toPersistence(post);
      await PostModel.updateOne({ id: postDoc.id }, postDoc);
    }
    this.postsToUpdate = [];
  }
}
