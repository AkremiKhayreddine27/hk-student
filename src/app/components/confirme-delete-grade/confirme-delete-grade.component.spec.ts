import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmeDeleteGradeComponent } from './confirme-delete-grade.component';

describe('ConfirmeDeleteGradeComponent', () => {
  let component: ConfirmeDeleteGradeComponent;
  let fixture: ComponentFixture<ConfirmeDeleteGradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmeDeleteGradeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmeDeleteGradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
