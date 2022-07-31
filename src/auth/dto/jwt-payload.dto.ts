import { Role } from '../interfaces/roles.enum';

export class JwtPayload {
  email: string;
  firstName: string;
  lastName: string;
  roles: Role[];
}
