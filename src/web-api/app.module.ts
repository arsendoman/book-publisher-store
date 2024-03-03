import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { DataServiceModule } from '../dataservices/data-service.module';
import { ConfigModule } from '../configuration/config.module';
import { ConfigService } from '../configuration/config.service';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from '../application/filters/exeption.filter';
import { BookModule } from './books/books.module';
import { BookCommentsModule } from './comments/book.comments.module';
import { CommentComplianceModule } from './commentcompliance/comment.compliance.module';

@Module({
  imports: [
    AuthModule,
    ProfileModule,
    BookModule,
    BookCommentsModule,
    CommentComplianceModule,
    DataServiceModule,
    ConfigModule.register(),
  ],
  providers: [
    ConfigService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
