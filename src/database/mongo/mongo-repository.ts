import { Model, now } from 'mongoose';
import { IRepository } from 'src/core/abstracts/repository.generic';

export class MongoRepository<T> implements IRepository<T> {
  protected _repository: Model<T>;
  protected _populateOnFind: string[];

  constructor(repository: Model<T>, populateOnFind: string[] = []) {
    this._repository = repository;
    this._populateOnFind = populateOnFind;
  }

  getAll(): Promise<T[]> {
    return this._repository.find().populate(this._populateOnFind).exec();
  }

  get(id: string): Promise<T> {
    return this._repository.findById(id).exec();
  }

  create(model: T): Promise<T> {
    return this._repository.create(model);
  }

  update(id: string, model: T): Promise<T> {
    return this._repository.findByIdAndUpdate(
      id,
      {
        ...model,
        updatedAt: now(),
      },
      { new: true },
    );
  }

  delete(id: string): Promise<void> {
    return this._repository.findByIdAndDelete(id);
  }
}
