import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { BookCommentsActionsEnum } from '../../../../core/enums/book.comments.enum';

export class BookCommentActionDto {
  @ApiProperty({
    enum: BookCommentsActionsEnum,
    isArray: false,
    example: Object.keys(BookCommentsActionsEnum),
  })
  @IsNotEmpty()
  action: BookCommentsActionsEnum;
}
