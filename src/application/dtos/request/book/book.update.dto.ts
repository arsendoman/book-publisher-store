import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsInt, Length, Max, Min } from 'class-validator';
import { BookCategoryEnum } from '../../../../core/enums/book.category.enum';
import { Exclude } from 'class-transformer';
import { BookLanguageEnum } from '../../../../core/enums/book.language.enum';

export class BookUpdateDto {
  @ApiProperty()
  @Length(5, 20)
  name?: string;
  @ApiProperty()
  @Length(5, 20)
  authorName?: string;
  @ApiProperty()
  @Length(10, 500)
  description?: string;
  @ApiProperty()
  photos?: string[];
  @ApiProperty()
  copies?: number;
  @ApiProperty()
  @IsInt()
  @Max(1000)
  @Min(1)
  price?: number;
  @ApiProperty()
  category?: BookCategoryEnum;
  @ApiProperty()
  @Length(10, 500)
  authorDescription?: string;
  @ApiProperty()
  @IsInt()
  @Min(50)
  @Max(1000)
  pagesCount?: number;
  @ApiProperty()
  @Exclude()
  language?: BookLanguageEnum;
  @ApiProperty()
  @IsDate()
  @Exclude()
  datePublished?: Date;
}
