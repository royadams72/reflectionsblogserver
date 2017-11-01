import { TestBed, inject } from '@angular/core/testing';

import { IsloggedinGuard } from './isloggedin.guard';

describe('IsloggedinGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsloggedinGuard]
    });
  });

  it('should be created', inject([IsloggedinGuard], (service: IsloggedinGuard) => {
    expect(service).toBeTruthy();
  }));
});
