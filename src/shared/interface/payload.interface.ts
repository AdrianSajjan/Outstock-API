import { Role } from '../enum';

export interface Payload {
  id: string;
  role: Role;
}

export interface UserPayload {
  id: string;
  role: Role;
  iat: number;
  exp: number;
}
