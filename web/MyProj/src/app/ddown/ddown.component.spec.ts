import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DdownComponent } from './ddown.component';

describe('DdownComponent', () => {
  let component: DdownComponent;
  let fixture: ComponentFixture<DdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
