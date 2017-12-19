import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekDayViewEventComponent } from './week-day-view-event.component';

describe('WeekDayViewEventComponent', () => {
  let component: WeekDayViewEventComponent;
  let fixture: ComponentFixture<WeekDayViewEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeekDayViewEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekDayViewEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
