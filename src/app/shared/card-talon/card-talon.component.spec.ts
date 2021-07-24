import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTalonComponent } from './card-talon.component';

describe('CardTalonComponent', () => {
  let component: CardTalonComponent;
  let fixture: ComponentFixture<CardTalonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardTalonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardTalonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
