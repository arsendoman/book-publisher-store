import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type RoleDocument = Role & Document;

export enum Roles {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  CUSTOMER = 'customer',
}

@Schema()
export class Role {
  @Prop()
  title: Roles;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
