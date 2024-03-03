import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
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

import { BooksCommentsService } from '../../application/services/books/comments/book.comments.service';
import { BookCommentCreateDto } from '../../application/dtos/request/comment/comment.create.dto';
import { BookCommentResponseDto } from '../../application/dtos/response/book/comments/book.comment.response.dto';
import { RequestInterface } from '../../application/auth/types/request.auth';
import { BookCommentUpdateDto } from '../../application/dtos/request/comment/comment.update.dto';
import { PaginationParams } from '../../application/decorators/pagination.decorator';
import { IPagination } from '../../core/interfaces/pagination.interface';
import { SortingParams } from '../../application/decorators/sort.decorator';
import { PaginatedResponseDto } from '../../application/dtos/response/paginatedResponse.dto';
import { BookCommentActionDto } from '../../application/dtos/request/comment/comment.action.dto';

@Controller('books')
@ApiBearerAuth('JWT-auth')
@SerializeOptions({
  excludePrefixes: ['_'],
})
export class BookCommentsController {
  constructor(private readonly commentsService: BooksCommentsService) {}

  @Post('/:bookId/comments')
  @ApiParam({
    name: 'bookId',
    required: true,
    description: 'Enter book id add comment to',
    type: 'string',
  })
  @AllowedRoles(Roles.CUSTOMER, Roles.SUPER_ADMIN)
  @UseGuards(JwtAuthGuard, PermissionGuard)
  createComment(
    @Param('bookId') bookId: string,
    @Body() createCommentDto: BookCommentCreateDto,
    @Request() req: RequestInterface,
  ): Promise<BookCommentResponseDto> {
    return this.commentsService.createComment(
      bookId,
      req.user.username,
      createCommentDto,
    );
  }

  @Patch('/:bookId/comments/:commentId')
  @ApiParam({
    name: 'bookId',
    required: true,
    description: 'Enter book id update comment to',
    type: 'string',
  })
  @ApiParam({
    name: 'commentId',
    required: true,
    description: 'Enter comment id to update',
    type: 'string',
  })
  @AllowedRoles(Roles.CUSTOMER, Roles.SUPER_ADMIN)
  @UseGuards(JwtAuthGuard, PermissionGuard)
  updateComment(
    @Param('bookId') bookId: string,
    @Param('commentId') commentId: string,
    @Body() bookCommentUpdateDto: BookCommentUpdateDto,
    @Request() req: RequestInterface,
  ): Promise<BookCommentResponseDto> {
    return this.commentsService.updateComment(
      bookId,
      commentId,
      req.user.username,
      bookCommentUpdateDto,
    );
  }

  @Get('/:bookId/comments')
  @ApiParam({
    name: 'bookId',
    required: true,
    description: 'Enter book id fetch comments from',
    type: 'string',
  })
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
  @AllowedRoles(Roles.CUSTOMER, Roles.SUPER_ADMIN)
  @UseGuards(JwtAuthGuard, PermissionGuard)
  fetchCommentsList(
    @Param('bookId') bookId: string,
    @PaginationParams() pagination: IPagination,
    @SortingParams(['likesAmount', 'createdAt']) sorting,
  ): Promise<PaginatedResponseDto<BookCommentResponseDto>> {
    return this.commentsService.fetchCommentsList(pagination, sorting, bookId);
  }

  @Post('/comments/:commentId')
  @ApiParam({
    name: 'commentId',
    required: true,
    description: 'Enter comment id to perform action',
    type: 'string',
  })
  @AllowedRoles(Roles.CUSTOMER, Roles.SUPER_ADMIN)
  @UseGuards(JwtAuthGuard, PermissionGuard)
  performCommentAction(
    @Param('bookId') bookId: string,
    @Param('commentId') commentId: string,
    @Body() action: BookCommentActionDto,
    @Request() req: RequestInterface,
  ): Promise<BookCommentResponseDto> {
    return this.commentsService.performCommentAction(
      commentId,
      req.user.id,
      action,
    );
  }

  @Delete()
  @ApiParam({
    name: 'bookId',
    required: true,
    description: 'Enter comment id to perform action',
    type: 'string',
  })
  deleteAllBookComments(@Param('bookId') bookId: string) {
    this.commentsService.deleteAllBookComments(bookId);
  }
}
