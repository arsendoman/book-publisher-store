import { IFiltersApply } from '../../core/abstracts/filters/filters.abstract';
import { BooksFilterDto } from '../dtos/request/book/books.filter.dto';
import { Injectable } from '@nestjs/common';

//TODO
@Injectable()
export class BooksFilterMapper {
  constructor(private filters: IFiltersApply) {}

  mapDtoToFilters<T>(dto: BooksFilterDto): T {
    const filters = {};

    const filterMappings = [
      {
        field: 'name',
        filterFunction: dto?.name
          ? this.filters.applyPartialTextMatchFilter(dto.name)
          : undefined,
      },
      {
        field: 'authorName',
        filterFunction: dto?.authorName
          ? this.filters.applyPartialTextMatchFilter(dto.authorName)
          : undefined,
      },
      {
        field: 'copies',
        filterFunction:
          dto?.copies?.from && dto?.copies?.to
            ? this.filters.applyRangeNumberFilter(
                dto.copies.from,
                dto.copies.to,
              )
            : undefined,
      },
      {
        field: 'price',
        filterFunction:
          dto?.price?.from && dto?.price?.to
            ? this.filters.applyRangeNumberFilter(dto.price.from, dto.price.to)
            : undefined,
      },
      {
        field: 'category',
        filterFunction: dto?.category
          ? this.filters.applyArrayContainsFilter(dto?.category)
          : undefined,
      },
      {
        field: 'pagesCount',
        filterFunction:
          dto?.pagesCount?.from && dto?.pagesCount?.to
            ? this.filters.applyRangeNumberFilter(
                dto.pagesCount.from,
                dto.pagesCount.to,
              )
            : undefined,
      },
      {
        field: 'language',
        filterFunction: dto?.language
          ? this.filters.applyArrayContainsFilter(dto?.language)
          : undefined,
      },
      {
        field: 'datePublished',
        filterFunction:
          dto?.datePublished?.from && dto?.datePublished?.to
            ? this.filters.applyRangeDateFilter(
                new Date(dto.datePublished.from),
                new Date(dto.datePublished.to),
              )
            : undefined,
      },
    ];

    filterMappings.forEach(({ field, filterFunction }) => {
      const value = filterFunction;
      if (value) {
        filters[field] = value;
      }
    });

    return filters as T;
  }
}
