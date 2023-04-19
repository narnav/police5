import { TestBed } from '@angular/core/testing';

import { GrdGuardGuard } from './grd-guard.guard';

describe('GrdGuardGuard', () => {
  let guard: GrdGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GrdGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
