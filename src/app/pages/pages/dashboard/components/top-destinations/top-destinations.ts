import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { NgForOf, NgIf } from '@angular/common';
import { TopDestination, TripsService } from '../../../../../services/trips.service';
import { CHART_COLORS } from '../../../../../utils/chart-colors.util';
import { calculatePercentage } from '../../../../../utils/percentage.util';
import { DEFAULT_DOUGHNUT_OPTIONS } from '../../../../../utils/chart-options.util';

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

  doughnutChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: [],
    datasets: [
      { data: [], backgroundColor: CHART_COLORS, hoverBackgroundColor: CHART_COLORS, borderWidth: 0 }
    ]
  };

  doughnutChartOptions = DEFAULT_DOUGHNUT_OPTIONS;

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
          percentage: calculatePercentage(d.count, total)
        }));

        this.doughnutChartData = {
          labels: this.destinations.map(dest => dest.location),
          datasets: [
            {
              data: this.destinations.map(dest => dest.percentage),
              backgroundColor: CHART_COLORS,
              hoverBackgroundColor: CHART_COLORS,
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
    return CHART_COLORS[index];
  }
}
