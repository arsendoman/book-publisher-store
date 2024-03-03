import { IRepository } from '../repository.generic';
import { Book } from 'src/core/entities';
import { IFilters } from '../filters/filter.abstract';
import { IPagination } from '../../interfaces/pagination.interface';
import { ISorting } from '../../interfaces/sorting.interface';
import { BookFilterDetail } from '../../interfaces/filter.details.interface';

export interface IBooksRepository extends IRepository<Book> {
  findBookByAuthorAndName(bookName: string, authorName: string): Promise<Book>;
  findBookByFilters(
    pagination: IPagination,
    sorting: ISorting,
    filters: IFilters,
  ): Promise<Book[]>;
  getBooksAmount(filters: IFilters): Promise<number>;
  getBookFiltersTotalDetails(filters: IFilters): Promise<BookFilterDetail[]>;
  getBookFilterRangesDetails(filters: IFilters): Promise<BookFilterDetail[]>;
  getBookFiltersDetails(filters: IFilters): Promise<BookFilterDetail[]>;
}
