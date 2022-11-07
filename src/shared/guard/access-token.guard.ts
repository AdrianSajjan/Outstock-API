import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IsPublicKey } from '../decorator/public.decorator';

@Injectable()
export class AccessJwtGuard extends AuthGuard('access-jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IsPublicKey, [context.getHandler(), context.getClass()]);
    if (isPublic) return true;
    return super.canActivate(context);
  }

  handleRequest(error, user) {
    if (error || !user) {
      throw error || new UnauthorizedException('Session invalid or expired');
    }
    return user;
  }
}
