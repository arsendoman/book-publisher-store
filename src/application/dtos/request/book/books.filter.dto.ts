import { ApiProperty } from '@nestjs/swagger';

import {
  ArrayMinSize,
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { BookCategoryEnum } from '../../../../core/enums/book.category.enum';
import { BookLanguageEnum } from '../../../../core/enums/book.language.enum';

class RangeNumberFilterDto {
  @ApiProperty({ type: Number, required: false })
  @IsNumber()
  @Min(0)
  @Max(500)
  @ValidateIf((object, value) => value !== null)
  from!: number | null;

  @ApiProperty({ type: Number, required: false })
  @IsNumber()
  @Min(0)
  @Max(500)
  @ValidateIf((object, value) => value !== null)
  to!: number | null;
}

class RangeDateFilterDto {
  @IsString()
  @ValidateIf((object, value) => value !== null)
  from!: string | null;
  @IsString()
  @ValidateIf((object, value) => value !== null)
  to!: string | null;
}

export class BooksFilterDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(5, 20)
  name?: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(5, 20)
  authorName?: string;
  @ApiProperty()
  @IsOptional()
  @ValidateNested()
  @Type(() => RangeNumberFilterDto)
  copies?: RangeNumberFilterDto;
  @ApiProperty()
  @IsOptional()
  @ValidateNested()
  @Type(() => RangeNumberFilterDto)
  price?: RangeNumberFilterDto;
  @ApiProperty()
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => String)
  category?: BookCategoryEnum[];
  @ApiProperty()
  @IsOptional()
  @ValidateNested()
  @Type(() => RangeNumberFilterDto)
  pagesCount?: RangeNumberFilterDto;
  @ApiProperty()
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => String)
  language?: BookLanguageEnum[];
  @ApiProperty()
  @IsOptional()
  @ValidateNested()
  @Type(() => RangeDateFilterDto)
  datePublished?: RangeDateFilterDto;
}

export class BooksFilterTotalDetailsDto {
  filters: BooksFilterDto;
  lastSelectedCategoryFilterName: string;
}
