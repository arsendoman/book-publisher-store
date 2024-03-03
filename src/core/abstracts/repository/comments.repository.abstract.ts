import { IRepository } from '../repository.generic';
import { BookComment } from 'src/core/entities';
import { ISorting } from '../../interfaces/sorting.interface';
import { IPagination } from '../../interfaces/pagination.interface';
import { BookCommentsActionsEnum } from '../../enums/book.comments.enum';

export interface IBookCommentsRepository extends IRepository<BookComment> {
  findCommentById(id: string): Promise<BookComment>;
  fetchBookComments(
    bookId: string,
    sorting: ISorting,
    pagination: IPagination,
  ): Promise<BookComment[]>;

  getCommentsAmount(bookId: string): Promise<number>;

  updateCommentUserInteractions(
    action: BookCommentsActionsEnum,
    commentId: string,
    profileId: string,
  ): Promise<BookComment>;

  deleteAll(bookId: string);
}
