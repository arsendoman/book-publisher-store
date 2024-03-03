import { Injectable } from '@nestjs/common';
import { MapperService } from './mapper.service';
import { CommentComplianceCreateDto } from '../dtos/request/comment/commentCompliance.create.dto';
import { CommentComplianceEntity } from '../../core/entities/commentCompliance.entity';
import { CommentComplianceResponseDto } from '../dtos/response/book/comments/commentCompliance.response.dto';

@Injectable()
export class CommentComplianceMapperService extends MapperService<
  CommentComplianceEntity,
  CommentComplianceResponseDto
> {
  async mapToDto(
    entity: CommentComplianceEntity,
  ): Promise<CommentComplianceResponseDto> {
    return {
      id: entity.id,
      bookId: entity.bookId,
      userId: entity.userId,
      commentId: entity.commentId,
      complianceReason: entity.complianceReason,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  mapToEntityOnCreate(
    userId: string,
    dto: CommentComplianceCreateDto,
  ): CommentComplianceEntity {
    return {
      bookId: dto.bookId,
      userId: userId,
      commentId: dto.commentId,
      complianceReason: dto.complianceReason,
    };
  }
}
