import { TestBed } from '@angular/core/testing';

import { FireTaskService } from './fire-task.service';

describe('FireTaskService', () => {
  let service: FireTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FireTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
