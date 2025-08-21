import { Component, Input } from '@angular/core';
import { Trip } from '../../../../../models/trip.interface';
import { NgClass, NgForOf } from '@angular/common';

@Component({
  selector: 'app-trip-detail',
  standalone: true,
  imports: [NgClass, NgForOf],
  templateUrl: './trip-detail.html',
  styleUrl: './trip-detail.css'
})
export class TripDetail {
  @Input() trip!: Trip;

  get starArray(): number[] {
    return [1, 2, 3, 4, 5];
  }

  isStarFilled(starNumber: number): boolean {
    return starNumber <= (this.trip?.driverRating || 0);
  }
}
