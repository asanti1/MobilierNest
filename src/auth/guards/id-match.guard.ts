import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

import { META_ROLES } from '../decorators/role-protected.decorator';
import { InvalidCredentials } from '../exceptions/invalid-credentials.exception';
import { Role } from '../interfaces/roles.enum';

@Injectable()
export class IdMatchesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles: string[] = this.reflector.get(
      META_ROLES,
      context.getHandler(),
    );
    const req = context.switchToHttp().getRequest();

    const user = req.user;

    const { id } = req.params;

    console.log(id);

    console.log(user);

    console.log(validRoles.some((role) => Role.ADMIN === role));

    if (
      req.params.id !== user.id &&
      !validRoles.some((role) => Role.ADMIN === role)
    ) {
      throw new InvalidCredentials(`You are not allowed to do this`);
    } else {
      return true;
    }
  }
}
