import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Dashboard } from './dashboard';
import { Sidebar } from '../../../components/shared/sidebar/sidebar';
import { Header } from '../../../components/shared/header/header';
import { TripsOverTime } from './components/trips-over-time/trips-over-time';
import { LatestTrips } from './components/latest-trips/latest-trips';
import { TopDestinations } from './components/top-destinations/top-destinations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('Dashboard Component', () => {
  let component: Dashboard;
  let fixture: ComponentFixture<Dashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        Dashboard,
        Sidebar,
        Header,
        TripsOverTime,
        LatestTrips,
        TopDestinations
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Dashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render Sidebar', () => {
    const sidebarEl = fixture.debugElement.query(By.css('app-sidebar'));
    expect(sidebarEl).toBeTruthy();
  });

  it('should render Header', () => {
    const headerEl = fixture.debugElement.query(By.css('app-header'));
    expect(headerEl).toBeTruthy();
  });

  it('should render TripsOverTime', () => {
    const tripsEl = fixture.debugElement.query(By.css('app-trips-over-time'));
    expect(tripsEl).toBeTruthy();
  });

  it('should render LatestTrips and TopDestinations', () => {
    const latestEl = fixture.debugElement.query(By.css('app-latest-trips'));
    const topDestEl = fixture.debugElement.query(By.css('app-top-destinations'));
    expect(latestEl).toBeTruthy();
    expect(topDestEl).toBeTruthy();
  });
});
