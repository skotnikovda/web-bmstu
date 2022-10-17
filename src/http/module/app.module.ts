import { Module } from '@nestjs/common';
import AuthModule from './auth.module';
import ForumModule from './forum.module';

@Module({
  imports: [AuthModule, ForumModule],
})
export default class AppModule {}
