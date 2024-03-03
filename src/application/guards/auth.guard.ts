import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log(user);

    if (!user) {
      throw new HttpException('Unathorized', HttpStatus.UNAUTHORIZED);
    }

    if (roles.includes(user.role)) {
      return true;
    }

    throw new HttpException('Forbiiten', HttpStatus.FORBIDDEN);
  }
}
