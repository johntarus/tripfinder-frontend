import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Sidebar} from '../../../components/shared/sidebar/sidebar';
import {NgClass, NgForOf} from '@angular/common';
import {Header} from '../../../components/shared/header/header';

@Component({
  selector: 'app-trips',
  imports: [
    FormsModule,
    Header,
    Sidebar,
    NgClass,
    NgForOf,
  ],
  templateUrl: './trips.html',
  styleUrl: './trips.css'
})
export class Trips {
  searchQuery = '';
  selectedDistance = 'any';
  selectedTime = 'any';
  selectedStatus: string = 'All Trips';

  statusOptions = [
    { label: 'All Trips', value: 'all' },
    { label: 'Completed', value: 'completed' },
    { label: 'Cancelled', value: 'cancelled' }
  ];

  distanceOptions = [
    { label: 'Any', value: 'any' },
    { label: 'Under 3 Km', value: 'under3' },
    { label: '3 to 6 Km', value: '3to6' },
    { label: '6 to 15 Km', value: '6to15' },
    { label: 'More than 15 Km', value: 'over15' }
  ];

  timeOptions = [
    { label: 'Any', value: 'any' },
    { label: 'Under 5 min', value: 'under5' },
    { label: '5 to 10 min', value: '5to10' },
    { label: '10 to 20 min', value: '10to20' },
    { label: 'More than 20 min', value: 'over20' }
  ];

  getStatusButtonClass(status: string): string {
    const baseClasses = 'px-6 py-3 rounded-full text-sm font-medium transition-colors duration-200 focus:outline-none';
    const activeClasses = 'bg-indigo-500 text-white';
    const inactiveClasses = 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white';

    return `${baseClasses} ${this.selectedStatus === status ? activeClasses : inactiveClasses}`;
  }

  selectStatus(status: string): void {
    this.selectedStatus = status;
  }

  search(): void {
    console.log('Searching with:', {
      query: this.searchQuery,
      status: this.selectedStatus,
      distance: this.selectedDistance,
      time: this.selectedTime
    });
  }
}
