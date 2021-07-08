import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwentyOneComponent } from './twenty-one.component';

describe('TwentyOneComponent', () => {
  let component: TwentyOneComponent;
  let fixture: ComponentFixture<TwentyOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TwentyOneComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TwentyOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
