import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesKey } from '../decorator';
import { Role } from '../enum';
import { UserPayload } from '../interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<Role[]>(RolesKey, [context.getHandler(), context.getClass()]);
    if (!roles) {
      return true;
    }
    const user: UserPayload = context.switchToHttp().getRequest().user;
    return roles.some((role) => user.role === role);
  }
}
