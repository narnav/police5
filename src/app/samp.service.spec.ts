import { TestBed } from '@angular/core/testing';

import { SampService } from './samp.service';

describe('SampService', () => {
  let service: SampService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SampService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
