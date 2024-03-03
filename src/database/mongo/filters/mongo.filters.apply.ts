import { IFiltersApply } from '../../../core/abstracts/filters/filters.abstract';
import {
  MongoArrayFilter,
  MongoRangeDateFilter,
  MongoRangeNumberFilter,
  MongoTextPartialMatchFilter,
} from './mongo.filters';

export class MongoFiltersApply implements IFiltersApply {
  applyPartialTextMatchFilter(value: string): MongoTextPartialMatchFilter {
    return { $regex: new RegExp(value, 'i') };
  }

  applyRangeNumberFilter(from?: number, to?: number): MongoRangeNumberFilter {
    return {
      $gte: from,
      $lte: to,
    };
  }

  applyRangeDateFilter(from?: Date, to?: Date): MongoRangeDateFilter {
    return {
      $gte: from,
      $lte: to,
    };
  }

  applyArrayContainsFilter(values: string[]): MongoArrayFilter {
    return {
      $in: values,
    };
  }
}
