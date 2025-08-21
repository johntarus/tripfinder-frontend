import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestTrips } from './latest-trips';

describe('LatestTrips', () => {
  let component: LatestTrips;
  let fixture: ComponentFixture<LatestTrips>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LatestTrips]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LatestTrips);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
