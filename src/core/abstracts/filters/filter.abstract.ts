// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IFilter {}

export class IFilters {
  name?: IFilter;
  authorName?: IFilter;
  copies?: IFilter;
  price?: IFilter;
  category?: IFilter;
  language?: IFilter;
  datePublished?: IFilter;
  pagesCount?: IFilter;
}
