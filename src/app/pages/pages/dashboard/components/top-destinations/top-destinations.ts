import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { NgForOf, NgIf } from '@angular/common';

// Define interfaces to match your Next.js types
interface Trip {
  dropoff_location: string;
  // Add other trip properties as needed
}

interface Destination {
  location: string;
  percentage: number;
}

@Component({
  selector: 'app-top-destinations',
  imports: [
    BaseChartDirective,
    NgForOf,
    NgIf
  ],
  templateUrl: './top-destinations.html',
  styleUrl: './top-destinations.css'
})
export class TopDestinations implements OnInit {
  destinations: Destination[] = [];
  loading = true;

  // Colors matching your Next.js version
  private colors = ["#6c63ff", "#ffcd56", "#ff6384"];

  doughnutChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: this.colors,
        hoverBackgroundColor: this.colors,
        borderWidth: 0
      }
    ]
  };

  doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    cutout: '60%',
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: false
      }
    },
    maintainAspectRatio: false,
    responsive: true
  };

  ngOnInit() {
    this.fetchTopDestinations();
  }

  private async fetchTopDestinations() {
    try {
      // Replace this with your actual data fetching logic
      const trips: Trip[] = await this.fetchTrips();

      const destinationCount: Record<string, number> = {};

      trips.forEach((trip) => {
        if (!destinationCount[trip.dropoff_location]) {
          destinationCount[trip.dropoff_location] = 1;
        } else {
          destinationCount[trip.dropoff_location]++;
        }
      });

      const totalTrips = trips.length;
      const sortedDestinations = Object.entries(destinationCount)
        .map(([location, count]) => ({
          location,
          percentage: Math.round((count / totalTrips) * 100),
        }))
        .sort((a, b) => b.percentage - a.percentage)
        .slice(0, 3);

      this.destinations = sortedDestinations;

      // Update chart data
      this.doughnutChartData = {
        labels: this.destinations.map((dest) => dest.location),
        datasets: [
          {
            data: this.destinations.map((dest) => dest.percentage),
            backgroundColor: this.colors,
            hoverBackgroundColor: this.colors,
            borderWidth: 0
          }
        ]
      };

      this.loading = false;
    } catch (error) {
      console.error('Error fetching trips data:', error);
      this.loading = false;
    }
  }

  // Mock function - replace with your actual data fetching service
  private async fetchTrips(): Promise<Trip[]> {
    // This should be replaced with your actual data fetching logic
    // For now, returning mock data that matches your original structure
    return Promise.resolve([
      { dropoff_location: 'St James, Nairobi' },
      { dropoff_location: 'St James, Nairobi' },
      { dropoff_location: 'St James, Nairobi' },
      { dropoff_location: 'Unnamed Road, Nairobi' },
      { dropoff_location: 'Unnamed Road, Nairobi' },
      { dropoff_location: 'Mombasa Road, Wambco Court, Nairobi' },
      { dropoff_location: 'Mombasa Road, Wambco Court, Nairobi' },
    ]);
  }

  getColor(index: number): string {
    return this.colors[index];
  }
}
