import {
  Controller,
  Param,
  Request,
  Patch,
  Post,
  Get,
  UseGuards,
  Body,
  Req,
} from '@nestjs/common';
import ForumService from 'application/forum.service';
import { ApiBody, ApiTags, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import JwtAuthGuard from 'http/guard/jwt.auth.guard';
import Member from 'http/decorators/member.decorator';
import DomainMember from 'domain/forum/member';
import MemberDTO from 'application/dto/member.dto';
import MemberUpdateDTO from 'application/dto/member.update.dto';
import PostCreateDTO from 'application/dto/post.create.dto';
import PostsGetDTO from 'application/dto/posts.get.dto';
import PostDetailsDTO from 'application/dto/post.details.dto';
import PostDTO from 'application/dto/post.dto';

@ApiTags('forum')
@Controller('forum')
export default class ForumController {
  private _forumService: ForumService;

  constructor(forumService: ForumService) {
    this._forumService = forumService;
  }

  @ApiBearerAuth('defaultBearerAuth')
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMember(@Member() member: DomainMember) {
    return new MemberDTO(member);
  }

  @ApiBearerAuth('defaultBearerAuth')
  @UseGuards(JwtAuthGuard)
  @Patch('me')
  async patchMember(
    @Member() member: DomainMember,
    @Body() dto: MemberUpdateDTO,
  ) {
    await this._forumService.updateMember(member.id.value, dto);
  }

  @ApiBearerAuth('defaultBearerAuth')
  @UseGuards(JwtAuthGuard)
  @Post('post/create')
  async createPost(@Body() dto: PostCreateDTO) {
    await this._forumService.createPost(dto);
  }

  @ApiBearerAuth('defaultBearerAuth')
  @UseGuards(JwtAuthGuard)
  @Get('posts')
  async getPosts(@Body() dto: PostsGetDTO) {
    let posts = await this._forumService.getPosts(dto);
    let dtos = posts.map((post) => new PostDetailsDTO(post));
    return dtos;
  }

  @ApiBearerAuth('defaultBearerAuth')
  @UseGuards(JwtAuthGuard)
  @Get('post/:id')
  async getPost(@Param('id') id: string) {
    let post = await this._forumService.getPost(id);
    let dto = new PostDTO(post);
    return dto;
  }

  /* Maybe later
  @UseGuards(JwtAuthGuard)
  @Get('posts/hot')
  async getHotPosts() {
    console.log('getHotPosts');
  }

  @UseGuards(JwtAuthGuard)
  @Get('posts/top')
  async getTopPosts() {
    console.log('getTopPosts');
  }
  */
}
