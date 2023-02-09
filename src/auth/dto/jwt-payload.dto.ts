import { Address } from 'src/user/address.schema';
import { Role } from '../interfaces/roles.enum';

export class JwtPayload {
  email: string;
  firstName: string;
  lastName: string;
  roles: Role[];
  phone?: string;
  address?: Address[];
  _id?: string;
}
