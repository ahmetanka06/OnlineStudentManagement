import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherinfoComponent } from './teacherinfo.component';

describe('TeacherinfoComponent', () => {
  let component: TeacherinfoComponent;
  let fixture: ComponentFixture<TeacherinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
