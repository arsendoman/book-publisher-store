import { Module } from '@nestjs/common';
import { DataServiceModule } from 'src/dataservices/data-service.module';
import { BookCommentsController } from './book.comments.controller';
import { BookCommentMapperService } from '../../application/mapping/book.comment.mapper.service';
import { BooksCommentsService } from '../../application/services/books/comments/book.comments.service';

@Module({
  imports: [DataServiceModule],
  controllers: [BookCommentsController],
  providers: [BooksCommentsService, BookCommentMapperService],
})
export class BookCommentsModule {}
