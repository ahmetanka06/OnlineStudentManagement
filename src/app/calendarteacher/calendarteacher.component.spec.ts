import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarteacherComponent } from './calendarteacher.component';

describe('CalendarteacherComponent', () => {
  let component: CalendarteacherComponent;
  let fixture: ComponentFixture<CalendarteacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarteacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarteacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
