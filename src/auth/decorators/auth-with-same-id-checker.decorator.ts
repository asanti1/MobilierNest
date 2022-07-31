import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IdMatchesGuard } from '../guards/id-match.guard';
import { UserRoleGuard } from '../guards/user-role.guard';

import { Role } from '../interfaces/roles.enum';
import { RoleProtected } from './role-protected.decorator';

export const AuthWithSameIdChecker = (...roles: Role[]) => {
  return applyDecorators(
    RoleProtected(...roles),
    UseGuards(AuthGuard(), UserRoleGuard, IdMatchesGuard),
  );
};
