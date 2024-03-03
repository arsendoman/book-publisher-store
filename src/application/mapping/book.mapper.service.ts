import { Injectable } from '@nestjs/common';
import { MapperService } from './mapper.service';
import { Book } from '../../core/entities';
import {
  BookFiltersDetailsDto,
  BookResponseDto,
} from '../dtos/response/book/book.response.dto';
import { BookUpdateDto } from '../dtos/request/book/book.update.dto';
import { BookFilterDetail } from '../../core/interfaces/filter.details.interface';

@Injectable()
export class BookMapperService extends MapperService<Book, BookResponseDto> {
  async mapToDto(entity: Book): Promise<BookResponseDto> {
    return {
      id: entity.id,
      name: entity.name,
      authorName: entity.authorName,
      description: entity.description,
      photos: entity.photos,
      copies: entity.copies,
      price: entity.price,
      category: entity.category,
      language: entity.language,
      datePublished: entity.datePublished,
      authorDescription: entity.authorDescription,
      pagesCount: entity.pagesCount,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  mapToEntity(id: string, dto: BookUpdateDto): Book {
    return {
      id: id,
      name: dto.name,
      authorName: dto.authorName,
      description: dto.description,
      photos: dto.photos,
      copies: dto.copies,
      price: dto.price,
      category: dto.category,
      language: dto.language,
      datePublished: dto.datePublished,
      authorDescription: dto.authorDescription,
      pagesCount: dto.pagesCount,
    };
  }

  mapToFiltersDto(result: BookFilterDetail[]): BookFiltersDetailsDto {
    return {
      data: result.map((item) => ({
        fieldType: item.fieldType,
        fieldName: item.fieldName,
        total: item.total,
        max: item.max,
        min: item.min,
      })),
    };
  }
}
