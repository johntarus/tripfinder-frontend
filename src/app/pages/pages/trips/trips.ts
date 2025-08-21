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

  filters: string[] = [];

  onRemoveFilter(filter: string) {
    this.filters = this.filters.filter(f => f !== filter);
  }


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

    const distanceMap = { any: undefined, under3: 0, '3to6': 1, '6to15': 2, over15: 3 };
    const durationMap = { any: undefined, under5: 0, '5to10': 1, '10to20': 2, over20: 3 };

    const distanceLabels = {
      any: undefined,
      under3: 'Under 3 Km',
      '3to6': '3–6 Km',
      '6to15': '6–15 Km',
      over15: 'Over 15 Km'
    };

    const durationLabels = {
      any: undefined,
      under5: 'Under 5 min',
      '5to10': '5–10 min',
      '10to20': '10–20 min',
      over20: 'Over 20 min'
    };

    const distance = distanceMap[this.selectedDistance as keyof typeof distanceMap];
    const duration = durationMap[this.selectedTime as keyof typeof durationMap];

    this.filters = [];
    if (statusFilter !== 'All') this.filters.push(statusFilter);
    // @ts-ignore
    if (distanceLabels[this.selectedDistance]) this.filters.push(distanceLabels[this.selectedDistance]!);
    // @ts-ignore
    if (durationLabels[this.selectedTime]) this.filters.push(durationLabels[this.selectedTime]!);
    if (this.searchQuery.trim()) this.filters.push(`${this.searchQuery.trim()}`);

    this.tripsService.searchTrips(
      this.searchQuery,
      statusFilter,
      distance,
      duration,
      1,
      10,
      'requestDate',
      false
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
