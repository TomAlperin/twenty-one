import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeCellComponent } from './free-cell.component';

describe('FreeCellComponent', () => {
  let component: FreeCellComponent;
  let fixture: ComponentFixture<FreeCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreeCellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
