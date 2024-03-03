import { BaseEntity } from './base.entity';

export class BookComment extends BaseEntity {
  bookId: string;
  username: string;
  text: string;
  likeInteractions: string[];
  dislikeInteractions: string[];
}
