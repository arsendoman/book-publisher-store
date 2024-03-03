import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IDataServices } from 'src/core/abstracts/data.source.abstract';
import { Role, Roles } from '../../../core/entities';

@Injectable()
export class RolesService {
  constructor(private dataService: IDataServices) {}

  public async findOrCreateRole(role: Role): Promise<Role> {
    if (
      !Object.values(Roles)
        .map((role) => role.toString())
        .includes(role.title)
    ) {
      throw new HttpException(
        'Such role does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }
    const roleFromDb = await this.dataService.roles.findRoleByTitle(role.title);
    if (!roleFromDb) {
      return await this.dataService.roles.create(role);
    }

    return roleFromDb;
  }
}
