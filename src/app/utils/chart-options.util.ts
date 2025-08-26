import { ChartConfiguration } from 'chart.js';

export const DEFAULT_DOUGHNUT_OPTIONS: ChartConfiguration<'doughnut'>['options'] = {
  cutout: '60%',
  plugins: {
    legend: { display: false },
    tooltip: { enabled: false }
  },
  maintainAspectRatio: false,
  responsive: true
};
