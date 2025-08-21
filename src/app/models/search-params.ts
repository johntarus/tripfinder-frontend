export interface SearchParams {
  Q?: string;
  IncludeCancelled?: boolean;
  Distance?: number; // 0, 1, 2, 3
  Duration?: number; // 0, 1, 2, 3
  Page?: number;
  PageSize?: number;
  SortBy?: string;
  SortDescending?: boolean;
}
