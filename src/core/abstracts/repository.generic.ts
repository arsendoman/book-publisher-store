export interface IRepository<T> {
  getAll(): Promise<T[]>;

  get(id: string): Promise<T>;

  create(model: T): Promise<T>;

  update(id: string, model: T): Promise<T>;

  delete(id: string): Promise<void>;
}
