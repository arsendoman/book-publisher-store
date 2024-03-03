import { BookCategoryEnum } from '../../../../core/enums/book.category.enum';
import { BookFilterDetail } from '../../../../core/interfaces/filter.details.interface';

export class BookResponseDto {
  id?: string;
  name: string;
  authorName: string;
  description: string;
  photos: string[];
  copies: number;
  price: number;
  category: BookCategoryEnum;
  language: string;
  datePublished: Date;
  authorDescription: string;
  pagesCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export class BookFiltersDetailsDto {
  data: BookFilterDetail[];
}
