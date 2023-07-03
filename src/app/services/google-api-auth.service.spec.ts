import { TestBed } from '@angular/core/testing';

import { GoogleApiAuthService } from './google-api-auth.service';

describe('GoogleApiAuthService', () => {
  let service: GoogleApiAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleApiAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
