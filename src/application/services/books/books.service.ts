import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IDataServices } from 'src/core/abstracts/data.source.abstract';
import { BookMapperService } from '../../mapping/book.mapper.service';
import { BookCreateDto } from '../../dtos/request/book/book.create.dto';
import { BookResponseDto } from '../../dtos/response/book/book.response.dto';
import { Book } from '../../../core/entities';
import { BookUpdateDto } from '../../dtos/request/book/book.update.dto';
import { BooksFilterDto } from '../../dtos/request/book/books.filter.dto';
import { BooksFilterMapper } from '../../mapping/books.filter.mapper';
import { ISorting } from '../../../core/interfaces/sorting.interface';
import { IPagination } from '../../../core/interfaces/pagination.interface';
import { PaginatedResponseDto } from '../../dtos/response/paginatedResponse.dto';
import { MongoFilters } from '../../../database/mongo/filters/mongo.filters';
import { NotificationPublisherService } from '../../notification.publisher.service/notification.publisher.service';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class BooksService {
  constructor(
    private dataService: IDataServices,
    private bookServiceMapper: BookMapperService,
    private bookFiltersMapper: BooksFilterMapper,
    private notificationPublisherService: NotificationPublisherService,
    private readonly amqpConnection: AmqpConnection,
  ) {}

  async publishBook(createBookDto: BookCreateDto): Promise<BookResponseDto> {
    const book = await this.dataService.books.findBookByAuthorAndName(
      createBookDto.name,
      createBookDto.authorName,
    );
    if (book) {
      throw new HttpException(
        'Such book already exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    const bookToPublish = new Book();
    Object.assign(bookToPublish, createBookDto);
    const createdBook = await this.dataService.books.create(bookToPublish);

    await this.amqpConnection.publish('notifications', 'book.notification', {
      title: 'Book Published',
      content: createdBook,
    });

    return this.bookServiceMapper.mapToDto(createdBook);
  }

  async updateBook(
    id: string,
    bookUpdateDto: BookUpdateDto,
  ): Promise<BookResponseDto> {
    const book = this.bookServiceMapper.mapToEntity(id, bookUpdateDto);
    const updatedBook = await this.dataService.books.update(id, book);
    return this.bookServiceMapper.mapToDto(updatedBook);
  }

  async deleteBook(id: string) {
    await this.dataService.books.delete(id);
  }

  async fetchBookList(
    pagination: IPagination,
    sorting: ISorting,
    filtersDto: BooksFilterDto,
  ): Promise<PaginatedResponseDto<BookResponseDto>> {
    const parsedFilters =
      this.bookFiltersMapper.mapDtoToFilters<MongoFilters>(filtersDto);

    const books = await this.dataService.books.findBookByFilters(
      pagination,
      sorting,
      parsedFilters,
    );

    const booksAmount = await this.dataService.books.getBooksAmount(
      parsedFilters,
    );

    const mappedBooksCollection =
      await this.bookServiceMapper.mapToDtoCollection(books);

    return this.bookServiceMapper.mapToPaginatedDto(
      mappedBooksCollection,
      booksAmount,
      pagination.page,
      pagination.limit,
    );
  }

  async getFiltersTotalDetails(filtersDto: BooksFilterDto) {
    const parsedFilters =
      this.bookFiltersMapper.mapDtoToFilters<MongoFilters>(filtersDto);

    const filterDetails = await this.dataService.books.getBookFiltersDetails(
      parsedFilters,
    );
    console.log(filterDetails);
    return this.bookServiceMapper.mapToFiltersDto(filterDetails);
  }

  async getFiltersRangeDetails(filtersDto: BooksFilterDto) {
    const parsedFilters =
      this.bookFiltersMapper.mapDtoToFilters<MongoFilters>(filtersDto);

    const filterDetails =
      await this.dataService.books.getBookFilterRangesDetails(parsedFilters);
    return this.bookServiceMapper.mapToFiltersDto(filterDetails);
  }

  async getBookInfo(id: string): Promise<BookResponseDto> {
    const bookById = await this.dataService.books.get(id);
    await this.notificationPublisherService.createBookPublishedEvent(bookById);
    return this.bookServiceMapper.mapToDto(bookById);
  }
}
