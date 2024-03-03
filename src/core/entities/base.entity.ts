type IdField<T> = T extends { _id: infer U } ? U : string;

export class BaseEntity {
  id?: IdField<this>;
  createdAt?: Date;
  updatedAt?: Date;
}
