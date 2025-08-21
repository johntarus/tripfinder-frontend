import { Component, Input, OnInit } from '@angular/core';
import { DatePipe, NgClass, NgForOf } from '@angular/common';
import { Trip } from '../../../../../models/trip.interface';
import { TripsService } from '../../../../../services/trips.service';

@Component({
  selector: 'app-trip-detail',
  standalone: true,
  imports: [NgClass, NgForOf],
  templateUrl: './trip-detail.html',
  styleUrl: './trip-detail.css'
})
export class TripDetail implements OnInit {
  @Input() trip!: Trip; // Keep for potential parent input, but we'll override with API data
  tripData: Trip | undefined; // Store API-fetched data

  get starArray(): number[] {
    return [1, 2, 3, 4, 5];
  }

  isStarFilled(starNumber: number): boolean {
    return starNumber <= (this.tripData?.driverRating || 0);
  }

  constructor(private tripsService: TripsService) {}

  ngOnInit(): void {
    this.fetchTripDetails();
  }

  private fetchTripDetails(): void {
    const tripId = this.trip?.id || 0; // Use input trip.id or default to 0
    this.tripsService.getTripById(tripId).subscribe({
      next: (data) => {
        this.tripData = data;
      },
      error: (err) => {
        console.error('Error fetching trip details:', err);
        this.tripData = {
          id: 0,
          pickup: 'Error',
          dropoff: 'Error',
          type: '',
          requestDate: '',
          status: 'Error',
          distance: 0,
          duration: 0,
          fare: 0,
          driverName: '',
          driverRating: 0,
          pickUpTime: '',
          dropOffTime: '',
          carMake: '',
          carModel: '',
          carNumber: '',
          carPictureUrl: '',
          driverPicture: '',
          pickupLat: 0,
          pickupLng: 0,
          dropoffLat: 0,
          dropoffLng: 0
        }; // Updated fallback data with correct casing
      }
    });
  }

  getPickupTimeOnly(time?: string): string {
    if (!time) return 'Unknown Time';
    return new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}
