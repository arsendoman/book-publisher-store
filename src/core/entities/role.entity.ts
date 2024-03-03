import { BaseEntity } from './base.entity';

export enum Roles {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  CUSTOMER = 'customer',
}

export class Role extends BaseEntity {
  title: Roles;
}
