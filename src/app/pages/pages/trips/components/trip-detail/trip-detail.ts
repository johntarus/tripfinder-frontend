import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import {DatePipe, NgClass, NgForOf} from '@angular/common';
import { Trip } from '../../../../../models/trip.interface';
import { TripsService } from '../../../../../services/trips.service';
import * as L from 'leaflet';

import { STAR_ARRAY, isStarFilled } from '../../../../../utils/rating.utils';
import {DEFAULT_ERROR_TRIP} from '../../../../../utils/utils/trip.utils';
import {initTripMap} from '../../../../../utils/utils/map.utils';

@Component({
  selector: 'app-trip-detail',
  standalone: true,
  imports: [NgClass, NgForOf, DatePipe],
  templateUrl: './trip-detail.html',
  styleUrl: './trip-detail.css'
})
export class TripDetail implements OnInit, AfterViewInit {
  @Input() trip!: Trip;
  tripData: Trip | undefined;

  private map!: L.Map;

  starArray = STAR_ARRAY;
  isStarFilled = (star: number) => isStarFilled(this.tripData?.driverRating || 0, star);

  constructor(private tripsService: TripsService) {}

  ngOnInit(): void {
    this.fetchTripDetails();
  }

  ngAfterViewInit(): void {
    if (this.tripData) this.initMap();
  }

  private fetchTripDetails(): void {
    const tripId = this.trip?.id || 0;
    this.tripsService.getTripById(tripId).subscribe({
      next: (data) => {
        this.tripData = data;
        this.initMap();
      },
      error: (err) => {
        console.error('Error fetching trip details:', err);
        this.tripData = DEFAULT_ERROR_TRIP;
      }
    });
  }

  private initMap(): void {
    if (!this.tripData) return;
    if (this.map) this.map.remove();

    this.map = initTripMap('trip-map',
      { lat: this.tripData.pickupLat, lng: this.tripData.pickupLng, label: this.tripData.pickup },
      { lat: this.tripData.dropoffLat, lng: this.tripData.dropoffLng, label: this.tripData.dropoff }
    );
  }
}
