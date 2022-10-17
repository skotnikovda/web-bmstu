import { createParamDecorator, ExecutionContext } from '@nestjs/common';

const Member = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

export default Member;
