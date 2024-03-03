import { CommentComplainsEnum } from '../../../../../core/enums/comment.complains.enum';

export class CommentComplianceResponseDto {
  id?: string;
  userId: string;
  bookId: string;
  complianceReason: CommentComplainsEnum;
  commentId: string;
  createdAt: Date;
  updatedAt: Date;
}
