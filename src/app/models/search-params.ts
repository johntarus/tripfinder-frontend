export interface SearchParams {
  Q?: string;
  IncludeCancelled?: boolean;
  Distance?: number;
  Duration?: number;
  Page?: number;
  PageSize?: number;
  SortBy?: string;
  SortDescending?: boolean;
}
