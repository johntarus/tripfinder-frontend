import { Component, Input } from '@angular/core';
import { Trip } from '../../../../../models/trip.interface';
import {NgClass, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [NgClass, NgForOf],
  templateUrl: './trip-card.html',
  styleUrls: ['./trip-card.css']
})
export class TripCard {
  @Input() trip!: Trip;

  get starArray(): number[] {
    return [1, 2, 3, 4, 5];
  }

  isStarFilled(starNumber: number): boolean {
    return starNumber <= this.trip.rating;
  }
}
