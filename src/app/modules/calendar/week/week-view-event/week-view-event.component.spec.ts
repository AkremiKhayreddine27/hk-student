import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekViewEventComponent } from './week-view-event.component';

describe('WeekViewEventComponent', () => {
  let component: WeekViewEventComponent;
  let fixture: ComponentFixture<WeekViewEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeekViewEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekViewEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
