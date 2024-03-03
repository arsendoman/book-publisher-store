import { Model } from 'mongoose';
import { MongoRepository } from '../mongo-repository';
import { Profile } from '../schemas';
import { IProfileRepository } from '../../../core/abstracts/repository/profile.repository.abstract';

export class ProfileRepository
  extends MongoRepository<Profile>
  implements IProfileRepository
{
  constructor(repository: Model<Profile>, populateOnFind: string[] = []) {
    super(repository, populateOnFind);
  }

  findByEmail(email: string): Promise<Profile> {
    return this._repository
      .findOne({
        email: email,
      })
      .populate(this._populateOnFind)
      .exec();
  }

  findById(id: string): Promise<Profile> {
    return this._repository
      .findOne({
        _id: id,
      })
      .populate(this._populateOnFind)
      .exec();
  }

  getAllExceptCurrent(id: string): Promise<Profile[]> {
    return this._repository
      .find()
      .where('_id')
      .ne(id)
      .populate(this._populateOnFind)
      .exec();
  }

  updateById(id: string, model: Profile): Promise<Profile> {
    return this._repository
      .findByIdAndUpdate(id, model, { new: true })
      .populate(this._populateOnFind)
      .exec();
  }
}
