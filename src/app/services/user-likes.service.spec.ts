import { TestBed } from '@angular/core/testing';

import { UserLikesService } from './user-likes.service';

describe('UserLikesService', () => {
  let service: UserLikesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserLikesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
