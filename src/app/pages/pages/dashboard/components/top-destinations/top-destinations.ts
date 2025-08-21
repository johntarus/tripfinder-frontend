import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { NgForOf, NgIf } from '@angular/common';
import {TopDestination, TripsService} from '../../../../../services/trips.service';

interface Destination {
  location: string;
  percentage: number;
}

@Component({
  selector: 'app-top-destinations',
  standalone: true,
  imports: [BaseChartDirective, NgForOf, NgIf],
  templateUrl: './top-destinations.html',
  styleUrl: './top-destinations.css'
})
export class TopDestinations implements OnInit {
  destinations: Destination[] = [];
  loading = true;

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
      legend: { display: false },
      tooltip: { enabled: false }
    },
    maintainAspectRatio: false,
    responsive: true
  };

  constructor(private tripsService: TripsService) {}

  ngOnInit() {
    this.fetchTopDestinations();
  }

  private fetchTopDestinations() {
    this.tripsService.getTopDestinations(3).subscribe({
      next: (data: TopDestination[]) => {
        const total = data.reduce((sum, d) => sum + d.count, 0);

        this.destinations = data.map(d => ({
          location: d.destination,
          percentage: total > 0 ? Math.round((d.count / total) * 100) : 0
        }));

        this.doughnutChartData = {
          labels: this.destinations.map(dest => dest.location),
          datasets: [
            {
              data: this.destinations.map(dest => dest.percentage),
              backgroundColor: this.colors,
              hoverBackgroundColor: this.colors,
              borderWidth: 0
            }
          ]
        };

        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching top destinations:', err);
        this.loading = false;
      }
    });
  }

  getColor(index: number): string {
    return this.colors[index];
  }
}
