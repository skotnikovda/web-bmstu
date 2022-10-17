import { Module } from '@nestjs/common';
import ForumController from 'http/controller/forum.controller';
import MemberReository from 'mongo/forum/repos/member.repository';
import PostRepository from 'mongo/forum/repos/post.repository';
import ForumService from 'application/forum.service';
import JwtStrategy from 'http/strategy/jwt.strategy';

@Module({
  controllers: [ForumController],
  providers: [
    {
      provide: 'IMemberRepository',
      useClass: MemberReository,
    },
    {
      provide: 'IPostRepository',
      useClass: PostRepository,
    },
    ForumService,
    JwtStrategy,
  ],
  exports: [ForumService],
})
export default class AppModule {}
