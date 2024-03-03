import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/core/entities';
import { IsArray, IsEmail, IsNotEmpty } from 'class-validator';
import { BookCategoryEnum } from '../../../../core/enums/book.category.enum';

export class ProfileDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
  @ApiProperty()
  @IsNotEmpty()
  readonly password: string;
  @ApiProperty()
  @IsNotEmpty()
  readonly username: string;
  @ApiProperty()
  @IsNotEmpty()
  readonly bio: string;
  @ApiProperty()
  @IsNotEmpty()
  readonly image: string;
  @ApiProperty()
  @IsNotEmpty()
  readonly role: Role;
  @ApiProperty()
  @IsArray()
  readonly favoriteCategories: BookCategoryEnum[];
}
