import { Injectable } from '@angular/core';
import {catchError, Observable, of, retry} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {TLatestTripData} from '../models/latest-trip.interface';
import {TripSearchResponse} from '../models/trip-search-response.interface';
import {Trip} from '../models/trip.interface';

export interface OvertimeData {
  date: string;
  value: number;
}

export interface TopDestination {
  destination: string;
  count: number;
}

@Injectable({
  providedIn: 'root'
})
export class TripsService {
  private baseUrl = 'http://localhost:5104/api/trips';

  constructor(private http: HttpClient) {
  }

  getTripsOverTime(): Observable<OvertimeData[]> {
    return this.http.get<OvertimeData[]>(`${this.baseUrl}/overtime`).pipe(
      retry(2),
      catchError(error => {
        console.error('Error fetching trips over time:', error);
        return of([]);
      })
    );
  }

  getTopDestinations(top: number = 3): Observable<TopDestination[]> {
    const params = new HttpParams().set('top', top.toString());

    return this.http.get<TopDestination[]>(`${this.baseUrl}/top-destinations`, { params }).pipe(
      retry(2),
      catchError(error => {
        console.error('Error fetching top destinations:', error);
        return of([]);
      })
    );
  }

  getLatestTrips(count: number = 5): Observable<TLatestTripData[]> {
    return this.http.get<TLatestTripData[]>(`${this.baseUrl}/latest?count=${count}`);
  }

  getTripById(id: number): Observable<Trip> {
    return this.http.get<Trip>(`${this.baseUrl}/${id}`);
  }

  searchTrips(
    query?: string,
    statusFilter: 'Completed' | 'Cancelled' | 'Both' | 'All' = 'All',
    distance?: number,
    duration?: number,
    page?: number,
    pageSize?: number,
    sortBy?: string,
    sortDescending?: boolean
  ): Observable<TripSearchResponse> {
    let params = new HttpParams();

    if (query) params = params.set('q', query);
    if (statusFilter) params = params.set('statusFilter', statusFilter); // send enum string
    if (distance !== undefined) params = params.set('distance', distance);
    if (duration !== undefined) params = params.set('duration', duration);
    if (page !== undefined) params = params.set('page', page);
    if (pageSize !== undefined) params = params.set('pageSize', pageSize);
    if (sortBy) params = params.set('sortBy', sortBy);
    if (sortDescending !== undefined) params = params.set('sortDescending', sortDescending);

    return this.http.get<TripSearchResponse>(`${this.baseUrl}/search`, { params });
  }

}
