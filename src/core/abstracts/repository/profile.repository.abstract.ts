import { IRepository } from 'src/core/abstracts/repository.generic';
import { Profile } from 'src/core/entities';

export interface IProfileRepository extends IRepository<Profile> {
  findByEmail(email: string): Promise<Profile>;
  findById(id: string): Promise<Profile>;
  getAllExceptCurrent(id: string): Promise<Profile[]>;
  updateById(id: string, model: Profile): Promise<Profile>;
}
