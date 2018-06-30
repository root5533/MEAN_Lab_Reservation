import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UcscLabsComponent } from './ucsc-labs.component';

describe('UcscLabsComponent', () => {
  let component: UcscLabsComponent;
  let fixture: ComponentFixture<UcscLabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UcscLabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UcscLabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
