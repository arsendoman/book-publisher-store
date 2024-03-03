import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class BookCommentUpdateDto {
  @ApiProperty()
  @IsNotEmpty()
  @Length(5, 20)
  text: string;
}
