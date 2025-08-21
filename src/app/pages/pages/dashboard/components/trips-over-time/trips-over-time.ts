import { Component, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import {DecimalPipe, NgIf} from '@angular/common';
import { OvertimeData, TripsService } from '../../../../../services/trips.service';

@Component({
  selector: 'app-trips-over-time',
  imports: [
    BaseChartDirective,
    NgIf,
    DecimalPipe
  ],
  templateUrl: './trips-over-time.html',
  styleUrl: './trips-over-time.css'
})
export class TripsOverTime implements OnInit {
  lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        data: [],
        borderColor: '#8B5CF6',
        backgroundColor: 'rgba(139,92,246,0.1)',
        fill: false,
        tension: 0.4,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#8B5CF6',
        pointRadius: 0,
        pointHoverRadius: 6,
        borderWidth: 3
      }
    ]
  };

  lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      x: {
        ticks: { color: '#9CA3AF', font: { size: 12 } },
        grid: { display: false },
        border: { display: false }
      },
      y: {
        display: false
      }
    },
    interaction: {
      intersect: false,
      mode: 'index'
    }
  };

  isLoading = true;
  currentValue = 0;

  constructor(private tripsService: TripsService) {}

  ngOnInit(): void {
    this.loadTripsOverTimeData();
  }

  loadTripsOverTimeData(): void {
    this.tripsService.getTripsOverTime().subscribe({
      next: (data: OvertimeData[]) => {
        this.processChartData(data);
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error loading trips over time data:', error);
        this.isLoading = false;
      }
    });
  }

  processChartData(data: OvertimeData[]): void {
    if (data.length === 0) {
      // Fallback to default data if API returns empty array
      this.lineChartData.datasets[0].data = [500, 1200, 1700, 1900, 3000, 4800, 4000, 3700, 3200, 2800, 3997, 3500];
      this.currentValue = 3997;
      return;
    }

    const monthlyData = new Array(12).fill(0);

    data.forEach(item => {
      const date = new Date(item.date);
      const monthIndex = date.getMonth();
      monthlyData[monthIndex] = item.value;
    });

    this.currentValue = monthlyData[monthlyData.length - 1] || (data.length > 0 ? data[data.length - 1].value : 0);

    this.lineChartData.datasets[0].data = monthlyData;
  }
}
