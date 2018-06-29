import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationFormModalComponent } from './reservation-form-modal.component';

describe('ReservationFormModalComponent', () => {
  let component: ReservationFormModalComponent;
  let fixture: ComponentFixture<ReservationFormModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationFormModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
