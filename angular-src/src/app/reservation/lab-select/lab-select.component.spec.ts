import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabSelectComponent } from './lab-select.component';

describe('LabSelectComponent', () => {
  let component: LabSelectComponent;
  let fixture: ComponentFixture<LabSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
