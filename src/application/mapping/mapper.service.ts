import { PaginatedResponseDto } from '../dtos/response/paginatedResponse.dto';

export abstract class MapperService<E, T> {
  public abstract mapToDto(entity: E): Promise<T>;

  public mapToDtoCollection(values: E[]): Promise<T[]> {
    return Promise.all<T>(values.map((v) => this.mapToDto(v)));
  }

  public mapToPaginatedDto<T>(
    data: T[],
    total: number,
    page: number,
    limit: number,
  ): PaginatedResponseDto<T> {
    return {
      data: data,
      page: page,
      total: total,
      limit: limit,
    };
  }
}
