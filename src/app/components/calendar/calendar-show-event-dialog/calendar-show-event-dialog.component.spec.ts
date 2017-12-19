import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarShowEventDialogComponent } from './calendar-show-event-dialog.component';

describe('CalendarShowEventDialogComponent', () => {
  let component: CalendarShowEventDialogComponent;
  let fixture: ComponentFixture<CalendarShowEventDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarShowEventDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarShowEventDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
