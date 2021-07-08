import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShuffleCardsComponent } from './shuffle-cards.component';

describe('ShuffleCardsComponent', () => {
  let component: ShuffleCardsComponent;
  let fixture: ComponentFixture<ShuffleCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShuffleCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShuffleCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
