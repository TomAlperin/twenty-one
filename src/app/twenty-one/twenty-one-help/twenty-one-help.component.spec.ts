import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwentyOneHelpComponent } from './twenty-one-help.component';

describe('TwentyOneHelpComponent', () => {
  let component: TwentyOneHelpComponent;
  let fixture: ComponentFixture<TwentyOneHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwentyOneHelpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TwentyOneHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
