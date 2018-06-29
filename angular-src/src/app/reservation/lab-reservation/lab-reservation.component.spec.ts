import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabReservationComponent } from './lab-reservation.component';

describe('LabReservationComponent', () => {
  let component: LabReservationComponent;
  let fixture: ComponentFixture<LabReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
