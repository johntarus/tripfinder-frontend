import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Sidebar } from '../../../components/shared/sidebar/sidebar';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { Header } from '../../../components/shared/header/header';
import { TripsList } from './components/trips-list/trips-list';
import { TripDetail } from './components/trip-detail/trip-detail';
import { TripDetailInterface } from '../../../models/trip-detail.interface';
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

  showTrips: boolean = false;

  showTripDetail: boolean = false;
  selectedTrip: Trip | null = null;

  onTripSelected(trip: Trip) {
    this.selectedTrip = trip;
    this.showTripDetail = true;
  }

  // back from trips list → go to home
  onBackToHome() {
    this.showTrips = false;
  }

  // back from trip detail → go to trips list
  onBackToTrips() {
    this.showTripDetail = false;
    this.selectedTrip = null;
  }

  statusOptions = [
    { label: 'All Trips', value: 'all' },
    { label: 'Completed', value: 'completed' },
    { label: 'Cancelled', value: 'cancelled' }
  ];

  distanceOptions = [
    { label: 'Any', value: 'any' },
    { label: 'Under 3 Km', value: 'under3' },
    { label: '3 to 6 Km', value: '3to6' },
    { label: '6 to 15 Km', value: '6to15' },
    { label: 'More than 15 Km', value: 'over15' }
  ];

  timeOptions = [
    { label: 'Any', value: 'any' },
    { label: 'Under 5 min', value: 'under5' },
    { label: '5 to 10 min', value: '5to10' },
    { label: '10 to 20 min', value: '10to20' },
    { label: 'More than 20 min', value: 'over20' }
  ];

  getStatusButtonClass(status: string): string {
    const baseClasses = 'px-6 py-3 rounded-full text-sm font-medium transition-colors duration-200 focus:outline-none';
    const activeClasses = 'bg-indigo-500 text-white';
    const inactiveClasses = 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white';

    return `${baseClasses} ${this.selectedStatus === status ? activeClasses : inactiveClasses}`;
  }

  selectStatus(status: string): void {
    this.selectedStatus = status;
  }

  search(): void {
    console.log('Searching with:', {
      query: this.searchQuery,
      status: this.selectedStatus,
      distance: this.selectedDistance,
      time: this.selectedTime
    });
  }

  sampleTrip: TripDetailInterface = {
    id: '1',
    date: 'Tue Oct 22, 2024',
    time: '2:15 PM',
    status: 'Complete',
    rating: 4,
    price: 290,
    duration: '2 hr 10 min',
    distance: '5 KM',
    pickupLocation: 'St James, Nairobi',
    dropoffLocation: 'Nextgen Mall, Nairobi',
    pickupTime: '2:30 PM',
    dropoffTime: '4:40 PM',
    mapImage: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    driver: {
      name: 'Enna Cooper',
      rating: 4.2,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    car: {
      makeModel: 'Toyota Harrier',
      year: 2021,
      plate: 'KDC 123A',
      color: 'White',
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  };
}
