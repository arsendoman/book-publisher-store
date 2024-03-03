import { BaseEntity } from './base.entity';
import { CommentComplainsEnum } from '../enums/comment.complains.enum';

export class CommentComplianceEntity extends BaseEntity {
  bookId: string;
  commentId: string;
  userId: string;
  complianceReason: CommentComplainsEnum;
}
