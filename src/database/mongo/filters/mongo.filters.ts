import {
  IFilter,
  IFilters,
} from '../../../core/abstracts/filters/filter.abstract';

export interface MongoTextPartialMatchFilter extends IFilter {
  $regex: RegExp;
}

export interface MongoRangeNumberFilter extends IFilter {
  $gte: number;
  $lte: number;
}

export interface MongoRangeDateFilter extends IFilter {
  $gte: Date;
  $lte: Date;
}

export interface MongoArrayFilter extends IFilter {
  $in: string[];
}

export class MongoFilters extends IFilters {
  name?: MongoTextPartialMatchFilter;
  authorName?: MongoTextPartialMatchFilter;
  copies?: MongoRangeNumberFilter;
  price?: MongoRangeNumberFilter;
  category?: MongoArrayFilter;
  language?: MongoArrayFilter;
  datePublished?: MongoRangeDateFilter;
  pagesCount?: MongoRangeNumberFilter;
}
