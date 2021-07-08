import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FourOFourComponent } from './four-o-four.component';

describe('FourOFourComponent', () => {
  let component: FourOFourComponent;
  let fixture: ComponentFixture<FourOFourComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FourOFourComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FourOFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
