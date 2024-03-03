import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsInt, IsNotEmpty, Length, Max, Min } from 'class-validator';
import { BookCategoryEnum } from '../../../../core/enums/book.category.enum';

export class BookCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  @Length(5, 20)
  readonly name: string;
  @ApiProperty()
  @IsNotEmpty()
  @Length(5, 20)
  readonly authorName: string;
  @ApiProperty()
  @IsNotEmpty()
  @Length(10, 500)
  readonly description: string;
  @ApiProperty()
  @IsNotEmpty()
  readonly photos: string[];
  @ApiProperty()
  @IsNotEmpty()
  readonly copies: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @Max(1000)
  @Min(1)
  readonly price: number;
  @ApiProperty()
  @IsNotEmpty()
  readonly category: BookCategoryEnum;
  @ApiProperty()
  @IsNotEmpty()
  readonly language: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  readonly datePublished: string;
  @ApiProperty()
  @IsNotEmpty()
  @Length(10, 500)
  readonly authorDescription: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @Min(50)
  @Max(1000)
  readonly pagesCount: number;
}
