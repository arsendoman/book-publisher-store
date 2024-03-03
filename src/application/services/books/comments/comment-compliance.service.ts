import { IDataServices } from '../../../../core/abstracts/data.source.abstract';
import { ISorting } from '../../../../core/interfaces/sorting.interface';
import { IPagination } from '../../../../core/interfaces/pagination.interface';
import { PaginatedResponseDto } from '../../../dtos/response/paginatedResponse.dto';
import { CommentComplianceCreateDto } from '../../../dtos/request/comment/commentCompliance.create.dto';
import { CommentComplianceMapperService } from '../../../mapping/commentCompliance.mapper.service';
import { CommentComplianceResponseDto } from '../../../dtos/response/book/comments/commentCompliance.response.dto';
import { Injectable } from '@nestjs/common';
import { CommentComplianceActionDto } from '../../../dtos/request/comment/compliance.action.dto';
import { ComplianceActionEnum } from '../../../../core/enums/compliance.action.enum';

@Injectable()
export class CommentComplianceService {
  constructor(
    private dataService: IDataServices,
    private commentComplianceMapperService: CommentComplianceMapperService,
  ) {}

  async createCommentComplianceRequest(
    userId: string,
    commentComplianceCreateDto: CommentComplianceCreateDto,
  ): Promise<CommentComplianceResponseDto> {
    const comment = this.commentComplianceMapperService.mapToEntityOnCreate(
      userId,
      commentComplianceCreateDto,
    );

    const createdComment = await this.dataService.commentCompliance.create(
      comment,
    );

    return this.commentComplianceMapperService.mapToDto(createdComment);
  }

  async fetchCommentComplianceList(
    pagination: IPagination,
    sorting: ISorting,
  ): Promise<PaginatedResponseDto<CommentComplianceResponseDto>> {
    const bookComments =
      await this.dataService.commentCompliance.fetchCommentCompliance(
        sorting,
        pagination,
      );

    const complianceAmount =
      await this.dataService.commentCompliance.getComplianceAmount();

    const mappedCommentCompliance =
      await this.commentComplianceMapperService.mapToDtoCollection(
        bookComments,
      );

    return this.commentComplianceMapperService.mapToPaginatedDto(
      mappedCommentCompliance,
      complianceAmount,
      pagination.page,
      pagination.limit,
    );
  }

  async performComplianceAction(
    complianceId: string,
    action: CommentComplianceActionDto,
  ) {
    if (action.complianceAction === ComplianceActionEnum.REMOVE_COMMENT) {
      const compliance = await this.dataService.commentCompliance.get(
        complianceId,
      );
      await this.dataService.bookComments.delete(compliance.commentId);
    }
    await this.dataService.commentCompliance.delete(complianceId);
  }
}
