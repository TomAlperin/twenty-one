import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolitaireStatsComponent } from './solitaire-stats.component';

describe('StatsComponent', () => {
  let component: SolitaireStatsComponent;
  let fixture: ComponentFixture<SolitaireStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SolitaireStatsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolitaireStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
