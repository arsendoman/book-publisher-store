import { BaseEntity } from './base.entity';
import { BookCategoryEnum } from '../enums/book.category.enum';
import { BookLanguageEnum } from '../enums/book.language.enum';

export class Book extends BaseEntity {
  name: string;
  authorName: string;
  description: string;
  photos: string[];
  copies: number;
  price: number;
  category: BookCategoryEnum;
  language: BookLanguageEnum;
  datePublished: Date;
  authorDescription: string;
  pagesCount: number;
}
