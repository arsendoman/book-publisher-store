import { ApiProperty } from '@nestjs/swagger';
import { Roles } from 'src/core/entities';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';
import { BookCategoryEnum } from '../../../../core/enums/book.category.enum';

export class RoleUpdateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: Roles;
  @ApiProperty()
  @IsOptional()
  @Exclude()
  _id: string;
}

export class ProfileUpdateDto {
  @ApiProperty()
  @IsOptional()
  @Exclude()
  _id: string;
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @ApiProperty()
  @IsNotEmpty()
  username: string;
  @ApiProperty()
  @IsNotEmpty()
  bio: string;
  @ApiProperty()
  @IsNotEmpty()
  image: string;
  @ApiProperty()
  @IsNotEmpty()
  role: RoleUpdateDto;
  @ApiProperty()
  favoriteCategories: BookCategoryEnum[];
}
