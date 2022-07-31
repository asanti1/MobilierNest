import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from '../guards/user-role.guard';

import { Role } from '../interfaces/roles.enum';
import { RoleProtected } from './role-protected.decorator';

export const Auth = (...roles: Role[]) => {
  return applyDecorators(
    RoleProtected(...roles),
    UseGuards(AuthGuard(), UserRoleGuard),
  );
};
