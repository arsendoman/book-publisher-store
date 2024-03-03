import { Model } from 'mongoose';
import { MongoRepository } from '../mongo-repository';
import { Role } from '../schemas';
import { IRoleRepository } from 'src/core/abstracts/repository/role.repository.abstract';

export class RoleRepository
  extends MongoRepository<Role>
  implements IRoleRepository
{
  constructor(repository: Model<Role>, populateOnFind: string[] = []) {
    super(repository, populateOnFind);
  }

  findRoleByTitle(title: string): Promise<Role> {
    return this._repository
      .findOne({
        title: title,
      })
      .exec();
  }
}
