import { TestBed } from '@angular/core/testing';

import { FilterEmployee } from './filter-employee';

describe('FilterEmployee', () => {
  let service: FilterEmployee;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterEmployee);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
