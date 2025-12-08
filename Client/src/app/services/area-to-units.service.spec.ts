import { TestBed } from '@angular/core/testing';

import { AreaToUnitsService } from './area-to-units.service';

describe('AreaToUnitsService', () => {
  let service: AreaToUnitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AreaToUnitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
