import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Trip } from '../../../../../models/trip.interface';
import { TripCard } from '../trip-card/trip-card';
import { NgForOf, NgIf } from '@angular/common';

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
export class TripsList {
  @Input() trips: Trip[] = [];
  @Output() tripClicked = new EventEmitter<Trip>();

  onTripClick(trip: Trip): void {
    console.log('Trip clicked:', trip);
    this.tripClicked.emit(trip);
  }

  trackByTripId(index: number, trip: Trip): number {
    return trip.id;
  }
}
