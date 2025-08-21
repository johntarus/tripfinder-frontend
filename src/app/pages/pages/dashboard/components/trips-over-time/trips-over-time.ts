import { Component } from '@angular/core';
import {BaseChartDirective} from 'ng2-charts';
import {ChartConfiguration} from 'chart.js';

@Component({
  selector: 'app-trips-over-time',
  imports: [
    BaseChartDirective
  ],
  templateUrl: './trips-over-time.html',
  styleUrl: './trips-over-time.css'
})
export class TripsOverTime {
  lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    datasets: [
      {
        data: [500, 1200, 1700, 1900, 3000, 4800, 4000, 3700, 3200, 2800, 3997, 3500],
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
    maintainAspectRatio: false, // Important for flexible height
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
        display: false // Hide Y axis completely like in design
      }
    },
    interaction: {
      intersect: false,
      mode: 'index'
    }
  };
}
