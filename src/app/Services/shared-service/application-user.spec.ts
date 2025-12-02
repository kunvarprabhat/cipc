import { TestBed } from '@angular/core/testing';
import { ApplicationUser } from './application-user';

describe('AuthServices', () => {
  let service: ApplicationUser;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationUser);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
