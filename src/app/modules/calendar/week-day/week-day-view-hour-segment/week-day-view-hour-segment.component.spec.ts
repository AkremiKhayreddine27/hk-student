import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekDayViewHourSegmentComponent } from './week-day-view-hour-segment.component';

describe('WeekDayViewHourSegmentComponent', () => {
  let component: WeekDayViewHourSegmentComponent;
  let fixture: ComponentFixture<WeekDayViewHourSegmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeekDayViewHourSegmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekDayViewHourSegmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
