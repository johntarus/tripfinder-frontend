import { Component, Input, OnInit } from '@angular/core';
import { NgClass, NgForOf } from '@angular/common';
import { Trip } from '../../../../../models/trip.interface';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [NgClass, NgForOf],
  templateUrl: './trip-card.html',
  styleUrl: './trip-card.css'
})
export class TripCard implements OnInit {
  @Input() trip!: Trip;
  backgroundImageUrl: string = '';

  get starArray(): number[] {
    return [1, 2, 3, 4, 5];
  }

  isStarFilled(starNumber: number): boolean {
    return starNumber <= (this.trip.driverRating || 0);
  }

  getFormattedDate(): string {
    if (!this.trip.requestDate) return 'Unknown Date';
    const date = new Date(this.trip.requestDate);
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  getFormattedTime(): string {
    if (!this.trip.requestDate) return 'Unknown Time';
    const date = new Date(this.trip.requestDate);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  }

  ngOnInit(): void {
    this.generateBackgroundImage();
  }

  generateBackgroundImage(): void {
    const themes = ['car', 'travel', 'city', 'road', 'transport'];
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    const seed = this.trip?.id || Math.floor(Math.random() * 1000);
    this.backgroundImageUrl = `https://source.unsplash.com/random/800x400/?${randomTheme}&sig=${seed}`;
  }
}
