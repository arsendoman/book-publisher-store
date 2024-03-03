import { Injectable } from '@nestjs/common';
import { MapperService } from './mapper.service';
import { BookCommentResponseDto } from '../dtos/response/book/comments/book.comment.response.dto';
import { BookCommentUpdateDto } from '../dtos/request/comment/comment.update.dto';
import { BookCommentCreateDto } from '../dtos/request/comment/comment.create.dto';
import { BookComment } from '../../core/entities';

@Injectable()
export class BookCommentMapperService extends MapperService<
  BookComment,
  BookCommentResponseDto
> {
  async mapToDto(entity: BookComment): Promise<BookCommentResponseDto> {
    return {
      id: entity.id,
      bookId: entity.bookId,
      username: entity.username,
      text: entity.text,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      likesAmount: entity.likeInteractions.length,
      dislikesAmount: entity.dislikeInteractions.length,
    };
  }

  mapToEntityOnUpdate(
    bookId: string,
    username: string,
    dto: BookCommentUpdateDto,
  ): BookComment {
    return {
      bookId: bookId,
      username: username,
      text: dto.text,
      likeInteractions: undefined,
      dislikeInteractions: undefined,
    };
  }

  mapToEntityOnCreate(
    bookId: string,
    username: string,
    dto: BookCommentCreateDto,
  ): BookComment {
    return {
      bookId: bookId,
      username: username,
      text: dto.text,
      likeInteractions: [],
      dislikeInteractions: [],
    };
  }
}
