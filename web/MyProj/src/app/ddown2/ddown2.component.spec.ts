import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ddown2Component } from './ddown2.component';

describe('Ddown2Component', () => {
  let component: Ddown2Component;
  let fixture: ComponentFixture<Ddown2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ddown2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ddown2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
