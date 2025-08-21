import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Trip } from '../../../../../models/trip.interface';
import { TripCard } from '../trip-card/trip-card';
import { NgForOf, NgIf } from '@angular/common';
import { TripsService } from '../../../../../services/trips.service';

@Component({
  selector: 'app-trips-list',
  imports: [
    TripCard,
    NgIf,
    NgForOf
  ],
  templateUrl: './trips-list.html',
  styleUrl: './trips-list.css'
})
export class TripsList implements OnInit {
  trips: Trip[] = [];
  loading = true;

  @Output() tripClicked = new EventEmitter<Trip>(); // Emit the clicked trip

  constructor(private tripsService: TripsService) {}

  ngOnInit(): void {
    this.loadTrips();
  }

  loadTrips(): void {
    this.tripsService.getTrips().subscribe({
      next: (trips) => {
        this.trips = trips;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading trips:', error);
        this.loading = false;
      }
    });
  }

  trackByTripId(index: number, trip: Trip): string {
    return trip.id;
  }

  onTripClick(trip: Trip): void {
    console.log('Trip clicked:', trip);
    this.tripClicked.emit(trip); // Emit the trip when clicked
  }
}
