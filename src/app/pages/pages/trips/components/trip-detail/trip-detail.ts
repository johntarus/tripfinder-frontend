import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { NgClass, NgForOf } from '@angular/common';
import { Trip } from '../../../../../models/trip.interface';
import { TripsService } from '../../../../../services/trips.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-trip-detail',
  standalone: true,
  imports: [NgClass, NgForOf],
  templateUrl: './trip-detail.html',
  styleUrl: './trip-detail.css'
})
export class TripDetail implements OnInit, AfterViewInit {
  @Input() trip!: Trip; // Keep for parent input
  tripData: Trip | undefined;

  private map!: L.Map;

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

  ngAfterViewInit(): void {
    if (this.tripData) this.initMap();
  }

  private fetchTripDetails(): void {
    const tripId = this.trip?.id || 0;
    this.tripsService.getTripById(tripId).subscribe({
      next: (data) => {
        this.tripData = data;
        this.initMap(); // initialize map after data is fetched
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
        };
      }
    });
  }

  getPickupTimeOnly(time?: string): string {
    if (!time) return 'Unknown Time';
    return new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  private initMap(): void {
    if (!this.tripData) return;

    // Remove existing map if it exists
    if (this.map) this.map.remove();

    // Initialize map centered at pickup
    this.map = L.map('trip-map', {
      center: [this.tripData.pickupLat, this.tripData.pickupLng],
      zoom: 13,
      zoomControl: false,
      attributionControl: false
    });

    // Tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);

    // Create a custom CSS class for the marker labels
    const createCustomIcon = (color: string, label: string) => {
      return L.divIcon({
        className: 'custom-marker',
        html: `
          <div class="flex items-center space-x-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 ${color}" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7zm0 9a2 2 0 110-4 2 2 0 010 4z"/>
            </svg>
            <span class="text-black font-semibold text-xs bg-white bg-opacity-80 px-1 rounded">${label}</span>
          </div>
        `,
        iconSize: [120, 24],
        iconAnchor: [0, 12]
      });
    };

    // Green pickup marker with black label
    const pickupIcon = createCustomIcon('text-green-500', this.tripData.pickup);
    L.marker([this.tripData.pickupLat, this.tripData.pickupLng], { icon: pickupIcon }).addTo(this.map);

    // Red dropoff marker with black label
    const dropoffIcon = createCustomIcon('text-red-500', this.tripData.dropoff);
    L.marker([this.tripData.dropoffLat, this.tripData.dropoffLng], { icon: dropoffIcon }).addTo(this.map);

    // Fit map to show both markers
    const bounds = L.latLngBounds([
      [this.tripData.pickupLat, this.tripData.pickupLng],
      [this.tripData.dropoffLat, this.tripData.dropoffLng]
    ]);
    this.map.fitBounds(bounds, { padding: [50, 50] });
  }
}
