import { IsNotEmpty, IsString } from 'class-validator';
import { Roles } from '../../../../core/entities';

export class RoleDto {
  @IsNotEmpty()
  @IsString()
  title: Roles;
}
