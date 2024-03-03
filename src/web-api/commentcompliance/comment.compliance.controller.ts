import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  SerializeOptions,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '../../database/mongo/schemas';
import { AllowedRoles } from 'src/application/decorators/roles.decorator';
import { PermissionGuard } from 'src/application/guards/auth.guard';
import { JwtAuthGuard } from '../../application/guards/jwt.auth.guard';
import { ApiBearerAuth, ApiHeader, ApiParam, ApiQuery } from '@nestjs/swagger';
import { RequestInterface } from '../../application/auth/types/request.auth';
import { PaginationParams } from '../../application/decorators/pagination.decorator';
import { IPagination } from '../../core/interfaces/pagination.interface';
import { SortingParams } from '../../application/decorators/sort.decorator';
import { PaginatedResponseDto } from '../../application/dtos/response/paginatedResponse.dto';
import { CommentComplianceCreateDto } from '../../application/dtos/request/comment/commentCompliance.create.dto';
import { CommentComplianceService } from '../../application/services/books/comments/comment-compliance.service';
import { CommentComplianceResponseDto } from '../../application/dtos/response/book/comments/commentCompliance.response.dto';
import { CommentComplianceActionDto } from '../../application/dtos/request/comment/compliance.action.dto';

@Controller('comment-compliance')
@ApiBearerAuth('JWT-auth')
@SerializeOptions({
  excludePrefixes: ['_'],
})
export class CommentComplianceController {
  constructor(
    private readonly commentComplianceService: CommentComplianceService,
  ) {}

  @Post()
  @AllowedRoles(Roles.CUSTOMER)
  @UseGuards(JwtAuthGuard, PermissionGuard)
  createCommentComplianceRequest(
    @Body() commentComplianceCreateDto: CommentComplianceCreateDto,
    @Request() req: RequestInterface,
  ): Promise<CommentComplianceResponseDto> {
    return this.commentComplianceService.createCommentComplianceRequest(
      req.user.id,
      commentComplianceCreateDto,
    );
  }

  @Get()
  @ApiQuery({
    name: 'page',
    type: Number,
    required: true,
    description: 'Page number',
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: true,
    description: 'Items per page',
  })
  @ApiHeader({
    name: 'sort',
    description: 'Sort header',
    required: true,
  })
  @AllowedRoles(Roles.ADMIN, Roles.SUPER_ADMIN)
  @UseGuards(JwtAuthGuard, PermissionGuard)
  fetchCommentsList(
    @PaginationParams() pagination: IPagination,
    @SortingParams(['createdAt']) sorting,
  ): Promise<PaginatedResponseDto<CommentComplianceResponseDto>> {
    return this.commentComplianceService.fetchCommentComplianceList(
      pagination,
      sorting,
    );
  }

  @Post('/:complianceId')
  @ApiParam({
    name: 'complianceId',
    required: true,
    description: 'Enter compliance id to perform action',
    type: 'string',
  })
  @AllowedRoles(Roles.ADMIN, Roles.SUPER_ADMIN)
  @UseGuards(JwtAuthGuard, PermissionGuard)
  performCommentAction(
    @Param('complianceId') complianceId: string,
    @Body() action: CommentComplianceActionDto,
  ) {
    this.commentComplianceService.performComplianceAction(complianceId, action);
  }
}
