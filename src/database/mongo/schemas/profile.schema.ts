import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Role } from './roles.schema';
import { BaseSchema } from './base.schema';
import { BookCategoryEnum } from '../../../core/enums/book.category.enum';

export type ProfileDocumnent = Profile & Document;

@Schema()
export class Profile extends BaseSchema {
  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ default: '' })
  bio: string;

  @Prop({ default: '' })
  image: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Role' })
  role: Role;

  @Prop({
    type: [String],
    enum: Object.values(BookCategoryEnum),
    default: '',
    required: true,
  })
  favoriteCategories: BookCategoryEnum[];
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
