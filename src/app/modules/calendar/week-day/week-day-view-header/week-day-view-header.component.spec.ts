import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekDayViewHeaderComponent } from './week-day-view-header.component';

describe('WeekDayViewHeaderComponent', () => {
  let component: WeekDayViewHeaderComponent;
  let fixture: ComponentFixture<WeekDayViewHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeekDayViewHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekDayViewHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
