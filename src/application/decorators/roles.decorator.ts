import { SetMetadata } from '@nestjs/common';
import { Roles } from 'src/database/mongo/schemas/roles.schema';

export const AllowedRoles = (...roles: Roles[]) => SetMetadata('roles', roles);
