export class PaginatedResponseDto<T> {
  data: T[];
  page: number;
  total: number;
  limit: number;
}
