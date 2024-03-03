import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';
import { CommentComplainsEnum } from '../../../../core/enums/comment.complains.enum';

export class CommentComplianceCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  bookId: string;
  @ApiProperty()
  @IsNotEmpty()
  commentId: string;
  @ApiProperty()
  @IsNotEmpty()
  @Length(5, 20)
  complianceReason: CommentComplainsEnum;
}
