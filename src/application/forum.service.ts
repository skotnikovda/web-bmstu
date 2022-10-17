import { Injectable, Inject } from '@nestjs/common';
import IMemberRepository from 'domain/forum/repos/member.repository.interface';
import IPostRepository from 'domain/forum/repos/post.repository.interface';
import MemberProps from 'domain/forum/member/props';
import MemberID from 'domain/forum/member/id';
import Member from 'domain/forum/member';
import MemberUpdateDTO from './dto/member.update.dto';
import PostCreateDTO from './dto/post.create.dto';
import Name from 'domain/forum/member/name';
import Birthday from 'domain/forum/member/birthday';
import PostProps from 'domain/forum/post/props';
import Title from 'domain/forum/post/title';
import Content from 'domain/forum/post/content';
import PublicationDate from 'domain/forum/post/publication.date';
import PostID from 'domain/forum/post/id';
import Post from 'domain/forum/post';
import PostsGetDTO from './dto/posts.get.dto';

@Injectable()
export default class ForumService {
  private _memberRepository: IMemberRepository;
  private _postRepository: IPostRepository;

  constructor(
    @Inject('IMemberRepository') memberRepository: IMemberRepository,
    @Inject('IPostRepository') postRepository: IPostRepository,
  ) {
    this._memberRepository = memberRepository;
    this._postRepository = postRepository;
  }

  async createMember(props: MemberProps, id: MemberID) {
    const member = new Member(props, id);
    await this._memberRepository.createOne(member);
    await this._memberRepository.commit();
  }

  async getMember(id: string): Promise<Member> {
    const member = await this._memberRepository.readOne(id);
    await this._memberRepository.commit();
    if (!member) {
      throw new Error('Member not found');
    }
    return member;
  }

  async updateMember(id: string, dto: MemberUpdateDTO) {
    const member = await this._memberRepository.readOne(id);
    if (!member) {
      throw new Error('Member not found');
    }
    let updatedProps: MemberProps = {
      name: new Name(dto.name),
      birthday: new Birthday(dto.birthday),
    };
    member.update(updatedProps);
    await this._memberRepository.commit();
  }

  async createPost(dto: PostCreateDTO) {
    const props: PostProps = {
      title: new Title(dto.title),
      content: new Content(dto.content),
      publicationDate: new PublicationDate(new Date(Date.now())),
    };
    const id: PostID = new PostID();
    const post: Post = new Post(props, id);
    await this._postRepository.createOne(post);
    await this._postRepository.commit();
  }

  async getPosts(dto: PostsGetDTO) {
    let posts = await this._postRepository.readManyDetails(
      dto.offset,
      dto.limit,
    );
    return posts;
  }

  async getPost(id: string) {
    let post = await this._postRepository.readOne(id);
    return post;
  }
}
