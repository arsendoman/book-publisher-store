import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from './base.schema';
import { CommentComplainsEnum } from '../../../core/enums/comment.complains.enum';
import mongoose from 'mongoose';

export type CommentComplianceDocument = CommentCompliance & Document;

@Schema()
export class CommentCompliance extends BaseSchema {
  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Book' })
  bookId: string;
  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'BookComment' })
  commentId: string;
  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Profile' })
  userId: string;
  @Prop()
  complianceReason: CommentComplainsEnum;
}

export const CommentComplianceSchema =
  SchemaFactory.createForClass(CommentCompliance);
