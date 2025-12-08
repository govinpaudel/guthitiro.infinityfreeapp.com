import { TestBed } from '@angular/core/testing';

import { GuthiService } from './guthi.service';

describe('GuthiService', () => {
  let service: GuthiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuthiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
