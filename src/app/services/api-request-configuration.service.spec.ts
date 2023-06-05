import { TestBed } from '@angular/core/testing';

import { ApiRequestConfiguration } from './api-request-configuration.service';

describe('ApiRequestConfigurationService', () => {
  let service: ApiRequestConfiguration;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiRequestConfiguration);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
