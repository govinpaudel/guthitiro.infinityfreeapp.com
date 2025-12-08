import { TestBed } from '@angular/core/testing';

import { NumtowordsService } from './numtowords.service';

describe('NumtowordsService', () => {
  let service: NumtowordsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NumtowordsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
