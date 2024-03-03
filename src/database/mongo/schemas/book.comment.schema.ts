import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from './base.schema';
import { Profile } from './profile.schema';
import mongoose from 'mongoose';

export type BookCommentDocument = BookComment & Document;

@Schema()
export class BookComment extends BaseSchema {
  @Prop()
  bookId: string;
  @Prop()
  username: string;
  @Prop()
  text: string;
  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Profile' })
  likeInteractions: string[];
  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Profile' })
  dislikeInteractions: string[];
}

export const BookCommentSchema = SchemaFactory.createForClass(BookComment);
