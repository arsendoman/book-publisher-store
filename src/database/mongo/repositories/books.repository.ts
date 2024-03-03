import { MongoRepository } from '../mongo-repository';
import { Model } from 'mongoose';
import { Book } from '../schemas';
import { IBooksRepository } from '../../../core/abstracts/repository/books.repository.abstract';
import { MongoFilters } from '../filters/mongo.filters';
import { IFilters } from '../../../core/abstracts/filters/filter.abstract';
import { IPagination } from '../../../core/interfaces/pagination.interface';
import { ISorting } from '../../../core/interfaces/sorting.interface';
import { BookFilterDetail } from '../../../core/interfaces/filter.details.interface';

export class BookRepository
  extends MongoRepository<Book>
  implements IBooksRepository
{
  constructor(repository: Model<Book>, populateOnFind: string[] = []) {
    super(repository, populateOnFind);
    this._repository.db.useDb('bookpublisher');
  }

  findBookByAuthorAndName(bookName: string, authorName: string): Promise<Book> {
    return this._repository
      .findOne({ name: bookName, authorName: authorName })
      .exec();
  }

  findBookByFilters(
    pagination: IPagination,
    sorting: ISorting,
    filters: MongoFilters,
  ): Promise<Book[]> {
    return this._repository
      .find(filters)
      .sort([[sorting.property, sorting.direction]])
      .limit(pagination.limit)
      .skip(pagination.limit * (pagination.page - 1))
      .exec();
  }

  getBooksAmount(filters: IFilters): Promise<number> {
    return this._repository.count(filters).exec();
  }

  getBookFiltersTotalDetails(filters: IFilters): Promise<BookFilterDetail[]> {
    const filterNamesWithTotalCounter = ['category', 'language'];

    const aggregationPipeline: any[] = [{ $facet: {} }];

    filterNamesWithTotalCounter.forEach((field) => {
      const fieldStats = [];

      const matchStage: any = {};
      matchStage.$match = { ...filters };
      if (Object.keys(filters).includes(field)) {
        delete matchStage.$match[field];
      }
      fieldStats.push(matchStage);

      fieldStats.push(
        {
          $group: {
            _id: { fieldType: field, fieldName: `$${field}` },
            totalBooks: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            fieldType: '$_id.fieldType',
            fieldName: '$_id.fieldName',
            total: '$totalBooks',
          },
        },
      );
      const facetStage = {
        $facet: {
          [`${field}Stats`]: fieldStats,
        },
      };

      aggregationPipeline[0].$facet = {
        ...aggregationPipeline[0].$facet,
        ...facetStage.$facet,
      };
    });

    aggregationPipeline.push(
      {
        $project: {
          mergedStats: {
            $concatArrays: filterNamesWithTotalCounter.map(
              (field) => `$${field}Stats`,
            ),
          },
        },
      },
      {
        $unwind: '$mergedStats',
      },
      {
        $replaceWith: '$mergedStats',
      },
    );

    return this._repository.aggregate(aggregationPipeline);
  }

  getBookFilterRangesDetails(filters: IFilters): Promise<BookFilterDetail[]> {
    const rangeFields = ['price', 'copies', 'pagesCount', 'datePublished'];

    const fieldsShouldBeCalculated: string[] = [];

    rangeFields.forEach((filter) => {
      if (!filters[filter]) {
        fieldsShouldBeCalculated.push(filter);
      }
    });

    const aggregationPipeline: any[] = [
      {
        $match: filters,
      },
      {
        $facet: {},
      },
    ];

    fieldsShouldBeCalculated.forEach((field) => {
      const facetStage = {
        $facet: {
          [`${field}Stats`]: [
            {
              $group: {
                _id: { fieldType: field },
                max: { $max: `$${field}` },
                min: { $min: `$${field}` },
              },
            },
            {
              $project: {
                _id: 0,
                fieldType: '$_id.fieldType',
                max: '$max',
                min: '$min',
              },
            },
          ],
        },
      };

      aggregationPipeline[1].$facet = {
        ...aggregationPipeline[1].$facet,
        ...facetStage.$facet,
      };
    });

    aggregationPipeline.push(
      {
        $project: {
          stats: {
            $concatArrays: fieldsShouldBeCalculated.map(
              (field) => `$${field}Stats`,
            ),
          },
        },
      },
      {
        $unwind: '$stats',
      },
      {
        $replaceWith: '$stats',
      },
    );

    return this._repository.aggregate(aggregationPipeline);
  }

  getBookFiltersDetails(filters: IFilters): Promise<BookFilterDetail[]> {
    const filterNamesWithTotalCounter = ['category', 'language'];
    const rangeFields = ['price', 'copies', 'pagesCount', 'datePublished'];

    const fieldsShouldBeCalculated: string[] = [];
    const filtersForGeneralRangeMatch = {};
    const filterForStages = {};

    rangeFields.forEach((filter) => {
      if (filters[filter]) {
        filtersForGeneralRangeMatch[filter] = filters[filter];
      }
    });

    filterNamesWithTotalCounter.forEach((filter) => {
      if (filters[filter]) {
        filterForStages[filter] = filters[filter];
      }
    });

    rangeFields.forEach((filter) => {
      if (!filters[filter]) {
        fieldsShouldBeCalculated.push(filter);
      }
    });

    const finalFields = [
      ...filterNamesWithTotalCounter,
      ...fieldsShouldBeCalculated,
    ];

    const aggregationPipeline: any[] = [
      {
        $match: filtersForGeneralRangeMatch,
      },
      {
        $facet: {},
      },
    ];

    finalFields.forEach((field) => {
      const fieldStats = [];

      const matchStage: any = {};
      matchStage.$match = { ...filterForStages };
      if (Object.keys(filterForStages).includes(field)) {
        delete matchStage.$match[field];
      }
      fieldStats.push(matchStage);

      if (rangeFields.includes(field)) {
        fieldStats.push(
          {
            $group: {
              _id: { fieldType: field },
              max: { $max: `$${field}` },
              min: { $min: `$${field}` },
            },
          },
          {
            $project: {
              _id: 0,
              fieldType: '$_id.fieldType',
              max: '$max',
              min: '$min',
            },
          },
        );
      } else {
        fieldStats.push(
          {
            $group: {
              _id: { fieldType: field, fieldName: `$${field}` },
              totalBooks: { $sum: 1 },
            },
          },
          {
            $project: {
              _id: 0,
              fieldType: '$_id.fieldType',
              fieldName: '$_id.fieldName',
              total: '$totalBooks',
            },
          },
        );
      }

      const facetStage = {
        $facet: {
          [`${field}Stats`]: fieldStats,
        },
      };

      aggregationPipeline[1].$facet = {
        ...aggregationPipeline[1].$facet,
        ...facetStage.$facet,
      };
    });

    aggregationPipeline.push(
      {
        $project: {
          mergedStats: {
            $concatArrays: finalFields.map((field) => `$${field}Stats`),
          },
        },
      },
      {
        $unwind: '$mergedStats',
      },
      {
        $replaceWith: '$mergedStats',
      },
    );

    return this._repository.aggregate(aggregationPipeline);
  }
}
