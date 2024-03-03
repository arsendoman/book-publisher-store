import { BookCategoryEnum } from '../../../../core/enums/book.category.enum';

export class ProfileResponseDto {
  id?: string;
  username: string;
  email: string;
  bio: string;
  image: string;
  role: RoleResponseDto;
  favoriteCategories: BookCategoryEnum[];
}

class RoleResponseDto {
  id?: string;
  title: string;
}
