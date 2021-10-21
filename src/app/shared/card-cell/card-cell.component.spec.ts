import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCellComponent } from './card-cell.component';

describe('CardCellComponent', () => {
  let component: CardCellComponent;
  let fixture: ComponentFixture<CardCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardCellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
