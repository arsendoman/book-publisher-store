import { IRepository } from '../repository.generic';
import { CommentComplianceEntity } from '../../entities/commentCompliance.entity';
import { ISorting } from '../../interfaces/sorting.interface';
import { IPagination } from '../../interfaces/pagination.interface';

export interface ICommentComplianceRepository
  extends IRepository<CommentComplianceEntity> {
  fetchCommentCompliance(
    sorting: ISorting,
    pagination: IPagination,
  ): Promise<CommentComplianceEntity[]>;

  getComplianceByCommentId(commentId: string);

  getComplianceAmount(): Promise<number>;
}
