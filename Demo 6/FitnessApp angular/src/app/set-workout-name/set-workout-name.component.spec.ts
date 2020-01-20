import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetWorkoutNameComponent } from './set-workout-name.component';

describe('SetWorkoutNameComponent', () => {
  let component: SetWorkoutNameComponent;
  let fixture: ComponentFixture<SetWorkoutNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetWorkoutNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetWorkoutNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
