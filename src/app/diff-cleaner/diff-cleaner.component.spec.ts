import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DiffCleanerComponent } from './diff-cleaner.component';

describe('DiffCleanerComponent', () => {
  let component: DiffCleanerComponent;
  let fixture: ComponentFixture<DiffCleanerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DiffCleanerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiffCleanerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
