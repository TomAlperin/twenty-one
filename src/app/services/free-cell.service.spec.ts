import { TestBed } from '@angular/core/testing';

import { FreeCellService } from './free-cell.service';

describe('FreeCellService', () => {
  let service: FreeCellService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FreeCellService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
