import { IFilter } from './filter.abstract';

export abstract class IFiltersApply {
  abstract applyPartialTextMatchFilter(value: string): IFilter;
  abstract applyRangeNumberFilter(from?: number, to?: number): IFilter;
  abstract applyRangeDateFilter(from?: Date, to?: Date): IFilter;
  abstract applyArrayContainsFilter(values: string[]): IFilter;
}
