import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IDataServices } from '../../../../core/abstracts/data.source.abstract';
import { BookCommentMapperService } from '../../../mapping/book.comment.mapper.service';
import { BookCommentCreateDto } from '../../../dtos/request/comment/comment.create.dto';
import { BookCommentUpdateDto } from '../../../dtos/request/comment/comment.update.dto';
import { BookCommentResponseDto } from '../../../dtos/response/book/comments/book.comment.response.dto';
import { ISorting } from '../../../../core/interfaces/sorting.interface';
import { IPagination } from '../../../../core/interfaces/pagination.interface';
import { PaginatedResponseDto } from '../../../dtos/response/paginatedResponse.dto';
import { BookCommentActionDto } from '../../../dtos/request/comment/comment.action.dto';
import { BookComment } from '../../../../core/entities';

@Injectable()
export class BooksCommentsService {
  constructor(
    private dataService: IDataServices,
    private bookCommentServiceMapper: BookCommentMapperService,
  ) {}

  async createComment(
    bookId: string,
    username: string,
    createCommentDto: BookCommentCreateDto,
  ): Promise<BookCommentResponseDto> {
    const comment = this.bookCommentServiceMapper.mapToEntityOnCreate(
      bookId,
      username,
      createCommentDto,
    );

    const createdComment = await this.dataService.bookComments.create(
      new BookComment(),
    );

    return this.bookCommentServiceMapper.mapToDto(createdComment);
  }

  async updateComment(
    bookId: string,
    commentId: string,
    username: string,
    updateCommentDto: BookCommentUpdateDto,
  ): Promise<BookCommentResponseDto> {
    const commentById = await this.dataService.bookComments.findCommentById(
      commentId,
    );

    if (commentById.username !== username) {
      throw new HttpException(
        'Username of modifier is not correct',
        HttpStatus.FORBIDDEN,
      );
    }

    if (commentById.bookId !== bookId) {
      throw new HttpException(
        'Comment is not belong to provided book',
        HttpStatus.FORBIDDEN,
      );
    }

    const commentToUpdate = this.bookCommentServiceMapper.mapToEntityOnUpdate(
      bookId,
      username,
      updateCommentDto,
    );

    const updatedComment = await this.dataService.bookComments.update(
      commentId,
      commentToUpdate,
    );

    return this.bookCommentServiceMapper.mapToDto(updatedComment);
  }

  async performCommentAction(
    commentId: string,
    userId: string,
    commentAction: BookCommentActionDto,
  ) {
    const commentById = await this.dataService.bookComments.findCommentById(
      commentId,
    );

    if (!commentById) {
      throw new HttpException(
        'Comment with such id does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    const updatedComment =
      await this.dataService.bookComments.updateCommentUserInteractions(
        commentAction.action,
        commentId,
        userId,
      );

    return this.bookCommentServiceMapper.mapToDto(updatedComment);
  }

  async fetchCommentsList(
    pagination: IPagination,
    sorting: ISorting,
    bookId: string,
  ): Promise<PaginatedResponseDto<BookCommentResponseDto>> {
    const bookComments = await this.dataService.bookComments.fetchBookComments(
      bookId,
      sorting,
      pagination,
    );
    console.log(bookComments);
    console.log(bookComments[0].constructor);

    const bookCommentsAmount =
      await this.dataService.bookComments.getCommentsAmount(bookId);

    const mappedBookComments =
      await this.bookCommentServiceMapper.mapToDtoCollection(bookComments);

    return this.bookCommentServiceMapper.mapToPaginatedDto(
      mappedBookComments,
      bookCommentsAmount,
      pagination.page,
      pagination.limit,
    );
  }

  async deleteAllBookComments(bookId: string) {
    await this.dataService.bookComments.deleteAll(bookId);
  }
}
