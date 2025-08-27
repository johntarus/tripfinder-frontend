import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Sidebar } from '../../../components/shared/sidebar/sidebar';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { Header } from '../../../components/shared/header/header';
import { TripsList } from './components/trips-list/trips-list';
import { TripDetail } from './components/trip-detail/trip-detail';
import { TripsService } from '../../../services/trips.service';
import { Trip } from '../../../models/trip.interface';

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

  filters: string[] = [];

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

  onRemoveFilter(filter: string) {
    if (filter === this.selectedStatus) this.selectedStatus = 'All Trips';
    if (filter.includes('Km')) this.selectedDistance = 'any';
    if (filter.includes('min')) this.selectedTime = 'any';
    if (filter === this.searchQuery) this.searchQuery = '';

    this.search();
  }

  search(): void {
    let statusFilter: 'Completed' | 'Cancelled' | 'Both' | 'All' = 'All';
    switch (this.selectedStatus) {
      case 'Completed':
        statusFilter = 'Completed';
        break;
      case 'Cancelled':
        statusFilter = 'Cancelled';
        break;
      case 'Completed & Cancelled':
        statusFilter = 'Both';
        break;
      default:
        statusFilter = 'All';
    }

    const distanceMap = {
      any: undefined,
      under3: 0,
      '3to6': 1,
      '6to15': 2,
      over15: 3,
    };
    const durationMap = {
      any: undefined,
      under5: 0,
      '5to10': 1,
      '10to20': 2,
      over20: 3,
    };

    const distance = distanceMap[this.selectedDistance as keyof typeof distanceMap];
    const duration = durationMap[this.selectedTime as keyof typeof durationMap];

    this.filters = [];
    if (this.searchQuery) this.filters.push(this.searchQuery);
    if (this.selectedStatus !== 'All Trips') this.filters.push(this.selectedStatus);

    const distanceLabels: any = {
      under3: 'Under 3 Km',
      '3to6': '3 to 6 Km',
      '6to15': '6 to 15 Km',
      over15: 'More than 15 Km',
    };
    if (this.selectedDistance !== 'any')
      this.filters.push(distanceLabels[this.selectedDistance]);

    const timeLabels: any = {
      under5: 'Under 5 min',
      '5to10': '5 to 10 min',
      '10to20': '10 to 20 min',
      over20: 'More than 20 min',
    };
    if (this.selectedTime !== 'any')
      this.filters.push(timeLabels[this.selectedTime]);

    // 🔎 Call backend
    this.tripsService
      .searchTrips(
        this.searchQuery,
        statusFilter,
        distance,
        duration,
        1, // page
        10, // pageSize
        'requestDate', // sortBy
        false // sortDescending
      )
      .subscribe({
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
        },
      });
  }
}
