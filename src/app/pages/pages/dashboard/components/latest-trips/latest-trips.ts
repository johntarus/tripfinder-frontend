import { Component } from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-latest-trips',
  imports: [
    NgForOf
  ],
  templateUrl: './latest-trips.html',
  styleUrl: './latest-trips.css'
})
export class LatestTrips {
  trips = [
    { location: 'Nextgen Mall, Nairobi', date: 'Tue Oct 22, 2024 2:30' },
    { location: 'Unnamed Road, Nairobi', date: 'Tue Oct 22, 2024 2:30' },
    { location: 'Amboseli Estate, Nairobi', date: 'Tue Oct 22, 2024 2:30' },
    { location: 'New Apostolic Church, Nairobi', date: 'Tue Oct 22, 2024 2:30' },
    { location: 'St James, Nairobi', date: 'Tue Oct 22, 2024 2:30' },
  ];
}
