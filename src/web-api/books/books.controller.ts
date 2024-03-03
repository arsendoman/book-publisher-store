import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  SerializeOptions,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Roles } from '../../database/mongo/schemas';
import { AllowedRoles } from 'src/application/decorators/roles.decorator';
import { PermissionGuard } from 'src/application/guards/auth.guard';
import { JwtAuthGuard } from '../../application/guards/jwt.auth.guard';
import { ApiBearerAuth, ApiHeader, ApiParam, ApiQuery } from '@nestjs/swagger';
import { BookResponseDto } from '../../application/dtos/response/book/book.response.dto';
import { BooksService } from '../../application/services/books/books.service';
import { BookCreateDto } from '../../application/dtos/request/book/book.create.dto';
import { BookUpdateDto } from '../../application/dtos/request/book/book.update.dto';
import { BooksFilterDto } from '../../application/dtos/request/book/books.filter.dto';
import { SortingParams } from '../../application/decorators/sort.decorator';
import { PaginatedResponseDto } from '../../application/dtos/response/paginatedResponse.dto';
import { PaginationParams } from '../../application/decorators/pagination.decorator';
import { IPagination } from '../../core/interfaces/pagination.interface';

@Controller('books')
@ApiBearerAuth('JWT-auth')
@SerializeOptions({
  excludePrefixes: ['_'],
})
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get('/:id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Enter book id to get info',
    type: 'string',
  })
  @AllowedRoles(Roles.ADMIN, Roles.CUSTOMER, Roles.SUPER_ADMIN)
  @UseGuards(JwtAuthGuard, PermissionGuard)
  getBookInfo(@Param('id') id: string): Promise<BookResponseDto> {
    return this.booksService.getBookInfo(id);
  }

  @Post('/filterTotalDetails')
  @UsePipes(new ValidationPipe())
  getBooksFiltersTotalDetails(
    @Body() filtersDto: BooksFilterDto,
  ): Promise<any> {
    return this.booksService.getFiltersTotalDetails(filtersDto);
  }

  @Post('/filterRangesDetails')
  @UsePipes(new ValidationPipe())
  getBooksFiltersRangesDetails(
    @Body() filtersDto: BooksFilterDto,
  ): Promise<any> {
    return this.booksService.getFiltersRangeDetails(filtersDto);
  }

  @Post('/list')
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
  @UsePipes(new ValidationPipe())
  getBooks(
    @PaginationParams() pagination: IPagination,
    @SortingParams(['name', 'authorName', 'price', 'datePublished']) sorting,
    @Body() filtersDto: BooksFilterDto,
  ): Promise<PaginatedResponseDto<BookResponseDto>> {
    return this.booksService.fetchBookList(pagination, sorting, filtersDto);
  }

  @Post()
  @AllowedRoles(Roles.SUPER_ADMIN, Roles.ADMIN)
  @UseGuards(JwtAuthGuard, PermissionGuard)
  publishBook(@Body() bookCreateDto: BookCreateDto): Promise<BookResponseDto> {
    return this.booksService.publishBook(bookCreateDto);
  }

  @Patch('/:id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Enter book id to update',
    type: 'string',
  })
  @AllowedRoles(Roles.SUPER_ADMIN, Roles.ADMIN)
  @UseGuards(JwtAuthGuard, PermissionGuard)
  updateBook(
    @Param('id') id: string,
    @Body() bookUpdateDto: BookUpdateDto,
  ): Promise<BookResponseDto> {
    return this.booksService.updateBook(id, bookUpdateDto);
  }

  @Delete('/:id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Enter book id to delete',
    type: 'string',
  })
  @AllowedRoles(Roles.SUPER_ADMIN, Roles.ADMIN)
  @UseGuards(JwtAuthGuard, PermissionGuard)
  deleteBook(@Param('id') id: string) {
    this.booksService.deleteBook(id);
  }
}
