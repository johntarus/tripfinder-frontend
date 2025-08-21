import {Trip} from './trip.interface';

export interface TripSearchResponse {
  success: boolean;
  message: string;
  data: {
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    hasPrevious: boolean;
    hasNext: boolean;
    items: Trip[];
  };
  errors: string[];
}
