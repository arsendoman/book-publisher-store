import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BookCategoryEnum } from '../../../core/enums/book.category.enum';
import { BaseSchema } from './base.schema';
import { BookLanguageEnum } from '../../../core/enums/book.language.enum';

export type BookDocument = Book & Document;

@Schema()
export class Book extends BaseSchema {
  @Prop()
  name: string;
  @Prop()
  authorName: string;
  @Prop()
  description: string;
  @Prop()
  photos: string[];
  @Prop()
  copies: number;
  @Prop()
  price: number;
  @Prop()
  category: BookCategoryEnum;
  @Prop()
  language: BookLanguageEnum;
  @Prop({ type: Date, default: Date.now })
  datePublished: Date;
  @Prop()
  authorDescription: string;
  @Prop()
  pagesCount: number;
}

export const BookSchema = SchemaFactory.createForClass(Book);
