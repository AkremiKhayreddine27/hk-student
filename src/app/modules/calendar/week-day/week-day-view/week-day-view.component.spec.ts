import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekDayViewComponent } from './week-day-view.component';

describe('WeekDayViewComponent', () => {
  let component: WeekDayViewComponent;
  let fixture: ComponentFixture<WeekDayViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeekDayViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekDayViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
