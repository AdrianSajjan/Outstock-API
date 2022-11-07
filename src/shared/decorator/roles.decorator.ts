import { SetMetadata } from '@nestjs/common';
import { Role } from '../enum';

export const RolesKey = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(RolesKey, roles);
