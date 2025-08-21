import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TripsOverTime } from './trips-over-time';
import { TripsService, OvertimeData } from '../../../../../services/trips.service';
import { of } from 'rxjs';
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip } from 'chart.js';

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip);

describe('TripsOverTime Component', () => {
  let component: TripsOverTime;
  let fixture: ComponentFixture<TripsOverTime>;
  let tripsServiceMock: any;

  const mockData: OvertimeData[] = [
    { date: '2025-01-10', value: 100 },
    { date: '2025-02-15', value: 200 },
    { date: '2025-03-20', value: 300 },
  ];

  beforeEach(async () => {
    tripsServiceMock = {
      getTripsOverTime: jasmine.createSpy('getTripsOverTime').and.returnValue(of(mockData))
    };

    await TestBed.configureTestingModule({
      imports: [TripsOverTime],
      providers: [
        { provide: TripsService, useValue: tripsServiceMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TripsOverTime);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getTripsOverTime on init', () => {
    expect(tripsServiceMock.getTripsOverTime).toHaveBeenCalled();
  });

  it('should set chart data and currentValue after fetching data', () => {
    expect(component.lineChartData.datasets[0].data[0]).toBe(100); // Jan
    expect(component.lineChartData.datasets[0].data[1]).toBe(200); // Feb
    expect(component.lineChartData.datasets[0].data[2]).toBe(300); // Mar
    expect(component.currentValue).toBe(300); // Last data point
    expect(component.isLoading).toBeFalse();
  });

  it('should fallback to default data if API returns empty array', () => {
    tripsServiceMock.getTripsOverTime.and.returnValue(of([]));
    component.loadTripsOverTimeData();
    fixture.detectChanges();
    expect(component.lineChartData.datasets[0].data.length).toBe(12);
    expect(component.currentValue).toBe(3997);
  });

  it('should display loading state initially', () => {
    component.isLoading = true;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Loading data...');
  });
});
