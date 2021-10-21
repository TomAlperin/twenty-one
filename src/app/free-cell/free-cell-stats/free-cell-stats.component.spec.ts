import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeCellStatsComponent } from './free-cell-stats.component';

describe('FreeCellStatsComponent', () => {
  let component: FreeCellStatsComponent;
  let fixture: ComponentFixture<FreeCellStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FreeCellStatsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeCellStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
