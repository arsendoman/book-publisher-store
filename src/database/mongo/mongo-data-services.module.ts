import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Profile,
  ProfileSchema,
  Role,
  RoleSchema,
  Book,
  BookSchema,
  BookComment,
  BookCommentSchema,
  CommentCompliance,
  CommentComplianceSchema,
} from './schemas';
import { IDataServices } from 'src/core/abstracts/data.source.abstract';
import { MongoDataServices } from './mongo-data-services.service';
import { MongoFiltersApply } from './filters/mongo.filters.apply';
import { IFiltersApply } from 'src/core/abstracts/filters/filters.abstract';
import { MongoFilters } from './filters/mongo.filters';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Role.name, schema: RoleSchema },
      { name: Profile.name, schema: ProfileSchema },
      { name: Book.name, schema: BookSchema },
      { name: BookComment.name, schema: BookCommentSchema },
      { name: CommentCompliance.name, schema: CommentComplianceSchema },
    ]),
    MongooseModule.forRoot('mongodb://book_publisher:27017/bookpublisher'),
  ],
  providers: [
    {
      provide: IDataServices,
      useClass: MongoDataServices,
    },
    {
      provide: IFiltersApply,
      useClass: MongoFiltersApply,
    },
    MongoFilters,
  ],
  exports: [IDataServices, IFiltersApply, MongoFilters],
})
export class MongoDataServicesModule {}
