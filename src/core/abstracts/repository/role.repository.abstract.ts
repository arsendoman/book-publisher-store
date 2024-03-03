import { Role } from 'src/core/entities';
import { IRepository } from '../repository.generic';

export interface IRoleRepository extends IRepository<Role> {
  findRoleByTitle(title: string): Promise<Role>;
}
