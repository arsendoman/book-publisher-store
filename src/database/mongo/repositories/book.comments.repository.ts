import { MongoRepository } from '../mongo-repository';
import { Model } from 'mongoose';
import { IBookCommentsRepository } from '../../../core/abstracts/repository/comments.repository.abstract';
import { BookComment } from '../schemas';
import { ISorting } from '../../../core/interfaces/sorting.interface';
import { IPagination } from '../../../core/interfaces/pagination.interface';
import { BookCommentsActionsEnum } from '../../../core/enums/book.comments.enum';
import {
  addCommentDislikePipeline,
  addCommentLikePipeline,
  addIsUserInInteractionsListPipeline,
  removeCommentDislikePipeline,
  removeCommentLikePipeline,
  unsetIsUserInInteractionsListPipeline,
} from '../aggregationPipes/commentsAction.aggregation';
import {
  addLikesAmountFieldPipeline,
  viewCommentPipeline,
} from '../aggregationPipes/commentView.aggregation';

export class BookCommentsRepository
  extends MongoRepository<BookComment>
  implements IBookCommentsRepository
{
  constructor(repository: Model<BookComment>, populateOnFind: string[] = []) {
    super(repository, populateOnFind);
  }

  findCommentById(id: string): Promise<BookComment> {
    return this._repository.findById(id).exec();
  }

  fetchBookComments(
    bookId: string,
    sorting: ISorting,
    pagination: IPagination,
  ): Promise<BookComment[]> {
    const sortField = {};
    sortField[sorting.property] = sorting.direction;

    return this._repository
      .aggregate<BookComment>([
        {
          $match: {
            bookId: bookId,
          },
        },
        addLikesAmountFieldPipeline,
        viewCommentPipeline,
      ])
      .sort(sortField)
      .limit(pagination.limit)
      .skip(0)
      .exec();
  }

  getCommentsAmount(bookId: string): Promise<number> {
    return this._repository
      .count({
        bookId: bookId,
      })
      .exec();
  }

  updateCommentUserInteractions(
    action: BookCommentsActionsEnum,
    commentId: string,
    profileId: string,
  ): Promise<BookComment> {
    const actionMap = {
      [BookCommentsActionsEnum.ADD_LIKE]: addCommentLikePipeline(profileId),
      [BookCommentsActionsEnum.ADD_DISLIKE]:
        addCommentDislikePipeline(profileId),
      [BookCommentsActionsEnum.REMOVE_LIKE]:
        removeCommentLikePipeline(profileId),
      [BookCommentsActionsEnum.REMOVE_DISLIKE]:
        removeCommentDislikePipeline(profileId),
    };

    return this._repository
      .findByIdAndUpdate(
        commentId,
        [
          addIsUserInInteractionsListPipeline(profileId),
          actionMap[action],
          unsetIsUserInInteractionsListPipeline,
        ],
        { new: true },
      )
      .exec();
  }

  deleteAll(bookId: string) {
    return this._repository
      .deleteMany({
        bookId: bookId,
      })
      .exec();
  }
}
