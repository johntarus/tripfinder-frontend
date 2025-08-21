import { Component, OnInit } from '@angular/core';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import { TripsService} from '../../../../../services/trips.service';
import {Trip} from '../../../../../models/trip.interface';
import {TLatestTripData} from '../../../../../models/latest-trip.interface';

@Component({
  selector: 'app-latest-trips',
  imports: [
    NgForOf,
    DatePipe,
    NgIf
  ],
  templateUrl: './latest-trips.html',
  styleUrl: './latest-trips.css'
})
export class LatestTrips implements OnInit {
  trips: TLatestTripData[] = [];
  loading = true;

  constructor(private tripsService: TripsService) {}

  ngOnInit() {
    this.tripsService.getLatestTrips(5).subscribe({
      next: (data) => {
        this.trips = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching latest trips:', err);
        this.loading = false;
      }
    });
  }
}
