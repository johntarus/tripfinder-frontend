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

  // private mockTrips: Trip[] = [
  //   {
  //     id: '1',
  //     date: 'Tue Oct 22, 2024',
  //     time: '2:15 PM',
  //     status: 'Complete',
  //     rating: 5,
  //     startLocation: 'St James, Nairobi',
  //     endLocation: 'Nextgen Mall, Nairobi',
  //     price: 253,
  //     distance: '1.5 KM',
  //     backgroundImage: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  //   },
  //   {
  //     id: '2',
  //     date: 'Fri Aug 9, 2019',
  //     time: '6:45 AM',
  //     status: 'Complete',
  //     rating: 0,
  //     startLocation: 'Manyanja, Nairobi',
  //     endLocation: 'St James, Nairobi',
  //     price: 894,
  //     distance: '15.5 KM',
  //     backgroundImage: 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  //   },
  //   {
  //     id: '3',
  //     date: 'Wed Aug 7, 2019',
  //     time: '4:35 PM',
  //     status: 'Canceled',
  //     rating: 0,
  //     startLocation: 'Bandari, Nairobi',
  //     endLocation: 'New Apostolic Church, Nairobi',
  //     price: 0,
  //     distance: '0.0 KM',
  //     backgroundImage: 'https://images.unsplash.com/photo-1570126618953-d437176e8c79?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  //   },
  //   {
  //     id: '4',
  //     date: 'Wed Aug 7, 2019',
  //     time: '4:15 PM',
  //     status: 'Complete',
  //     rating: 0,
  //     startLocation: 'St James, Nairobi',
  //     endLocation: 'Amboseli Estate, Nairobi',
  //     price: 200,
  //     distance: '2.1 KM',
  //     backgroundImage: 'https://images.unsplash.com/photo-1555109307-f7d9da25c244?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  //   },
  //   {
  //     id: '5',
  //     date: 'Wed Aug 7, 2019',
  //     time: '11:29 PM',
  //     status: 'Complete',
  //     rating: 0,
  //     startLocation: 'Makaburini, Nairobi',
  //     endLocation: 'St James, Nairobi',
  //     price: 440,
  //     distance: '9.1 KM',
  //     backgroundImage: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  //   },
  //   {
  //     id: '6',
  //     date: 'Wed Aug 6, 2019',
  //     time: '10:03 PM',
  //     status: 'Complete',
  //     rating: 5,
  //     startLocation: 'Phase 4/Car Wash, Nairobi',
  //     endLocation: 'Unnamed Road, Nairobi',
  //     price: 200,
  //     distance: '1.3 KM',
  //     backgroundImage: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  //   }
  // ];

  // getTrips(): Observable<Trip[]> {
  //   return of(this.mockTrips).pipe(delay(1000));
  // }

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
