import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripsOverTime } from './trips-over-time';

describe('TripsOverTime', () => {
  let component: TripsOverTime;
  let fixture: ComponentFixture<TripsOverTime>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripsOverTime]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripsOverTime);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
