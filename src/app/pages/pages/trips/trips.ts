import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Sidebar } from '../../../components/shared/sidebar/sidebar';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { Header } from '../../../components/shared/header/header';
import { TripsList } from './components/trips-list/trips-list';
import { TripDetail } from './components/trip-detail/trip-detail';
import {  TripsService } from '../../../services/trips.service';
import {Trip} from '../../../models/trip.interface';

@Component({
  selector: 'app-trips',
  imports: [
    FormsModule,
    Header,
    Sidebar,
    NgClass,
    NgForOf,
    TripsList,
    NgIf,
    TripDetail,
  ],
  templateUrl: './trips.html',
  styleUrl: './trips.css'
})
export class Trips {
  searchQuery = '';
  selectedDistance = 'any';
  selectedTime = 'any';
  selectedStatus: string = 'All Trips';
  trips: Trip[] = [];

  showTrips: boolean = false;
  showTripDetail: boolean = false;
  selectedTrip: Trip | null = null;

  constructor(private tripsService: TripsService) {}

  onTripSelected(trip: Trip) {
    this.selectedTrip = trip;
    this.showTripDetail = true;
  }

  onBackToHome() {
    this.showTrips = false;
  }

  onBackToTrips() {
    this.showTripDetail = false;
    this.selectedTrip = null;
  }

  search(): void {
    const includeCancelled = this.selectedStatus === 'Cancelled' || this.selectedStatus === 'All Trips';
    const distanceMap = { 'any': undefined, 'under3': 0, '3to6': 1, '6to15': 2, 'over15': 3 };
    const durationMap = { 'any': undefined, 'under5': 0, '5to10': 1, '10to20': 2, 'over20': 3 };
    const distance = distanceMap[this.selectedDistance.replace(/\s+/g, '') as keyof typeof distanceMap];
    const duration = durationMap[this.selectedTime.replace(/\s+/g, '') as keyof typeof durationMap];

    this.tripsService.searchTrips(
      this.searchQuery,
      includeCancelled,
      distance,
      duration,
      1, // Default page
      10, // Default pageSize
      'requestDate', // Default sortBy
      false // Default sortDescending
    ).subscribe({
      next: (response) => {
        if (response.success) {
          this.trips = response.data.items;
          this.showTrips = true;
        } else {
          console.error('Search failed:', response.message);
          this.trips = [];
        }
      },
      error: (error) => {
        console.error('Error searching trips:', error);
        this.trips = [];
      }
    });
  }
}
