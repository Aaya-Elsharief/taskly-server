import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { SourceEnum } from 'src/modules/token/constants/token.enum';

export const DeviceSource = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): SourceEnum => {
    const request = ctx.switchToHttp().getRequest();
    const userAgent = request.headers['user-agent'] || '';
    console.log('userAgent in decorator: ', userAgent);

    return userAgent.toLowerCase().includes('mobile')
      ? SourceEnum.MOBILE
      : SourceEnum.WEB;
  },
);
