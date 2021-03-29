import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiffCleanerComponent } from './diff-cleaner.component';

describe('DiffCleanerComponent', () => {
  let component: DiffCleanerComponent;
  let fixture: ComponentFixture<DiffCleanerComponent>;

  beforeEach(async(() => {
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
