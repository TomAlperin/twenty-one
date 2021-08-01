import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwentyoneStatsComponent } from './twenty-one-stats.component';

describe('TwentyoneStatsComponent', () => {
  let component: TwentyoneStatsComponent;
  let fixture: ComponentFixture<TwentyoneStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TwentyoneStatsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TwentyoneStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
