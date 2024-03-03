import { Role } from './';
import { BaseEntity } from './base.entity';
import { BookCategoryEnum } from '../enums/book.category.enum';

export class Profile extends BaseEntity {
  username: string;
  email: string;
  password: string;
  bio: string;
  image: string;
  role: Role;
  favoriteCategories: BookCategoryEnum[];
}
