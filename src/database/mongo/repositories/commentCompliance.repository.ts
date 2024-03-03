import { MongoRepository } from '../mongo-repository';
import { Model } from 'mongoose';
import {
  CommentCompliance,
  CommentComplianceDocument,
} from '../schemas/comment.complaince';
import { ICommentComplianceRepository } from '../../../core/abstracts/repository/commentComplicance.repository.abstract';
import { ISorting } from '../../../core/interfaces/sorting.interface';
import { IPagination } from '../../../core/interfaces/pagination.interface';

export class CommentComplianceRepository
  extends MongoRepository<CommentCompliance>
  implements ICommentComplianceRepository
{
  constructor(
    repository: Model<CommentComplianceDocument>,
    populateOnFind: string[] = [],
  ) {
    super(repository, populateOnFind);
  }

  fetchCommentCompliance(
    sorting: ISorting,
    pagination: IPagination,
  ): Promise<CommentCompliance[]> {
    return this._repository
      .find({})
      .sort([[sorting.property, sorting.direction]])
      .limit(pagination.limit)
      .skip(0)
      .exec();
  }

  getComplianceAmount(): Promise<number> {
    return this._repository.count({}).exec();
  }

  getComplianceByCommentId(commentId: string) {
    return this._repository
      .find({
        commentId: commentId,
      })
      .exec();
  }
}
