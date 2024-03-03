export class BookCommentResponseDto {
  id?: string;
  username: string;
  bookId: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
  likesAmount: number;
  dislikesAmount: number;
}
