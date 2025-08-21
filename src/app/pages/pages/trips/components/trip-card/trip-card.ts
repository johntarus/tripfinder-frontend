import { Component, Input, OnInit } from '@angular/core';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { Trip } from '../../../../../models/trip.interface';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [NgClass, NgForOf, NgIf],
  templateUrl: './trip-card.html',
  styleUrl: './trip-card.css'
})
export class TripCard implements OnInit {
  @Input() trip!: Trip;
  backgroundImageUrl: string = '';
  imageLoaded: boolean = false;
  imageError: boolean = false;

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
    // Curated list of Unsplash URLs with African wildlife and Nairobi themes
    const wildlifeNairobiImages = [
      'https://images.unsplash.com/photo-1565717655296-0d2a966b52e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Nairobi National Park
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Wildlife in Kenya
      'https://images.unsplash.com/photo-1593368496242-3b7594e8b662?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // African savanna with city view
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Nairobi skyline with wildlife
      'https://images.unsplash.com/photo-1556075798-4827b2a16e2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'  // Kenyan wildlife
    ];

    const seed = this.trip?.id || Math.floor(Math.random() * 1000);
    const index = seed % wildlifeNairobiImages.length;

    this.backgroundImageUrl = wildlifeNairobiImages[index];
    this.checkImageLoad();
  }


  checkImageLoad(): void {
    const img = new Image();
    img.src = this.backgroundImageUrl;
    img.onload = () => {
      console.log('Image loaded successfully:', this.backgroundImageUrl);
      this.onImageLoad();
    };
    img.onerror = () => {
      console.error('Image failed to load:', this.backgroundImageUrl);
      this.onImageError();
    };
  }

  onImageLoad(): void {
    this.imageLoaded = true;
    this.imageError = false;
  }

  onImageError(): void {
    this.imageError = true;
    this.imageLoaded = false;
    this.backgroundImageUrl = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    console.warn('Switched to fallback gradient due to image error');
  }
}
