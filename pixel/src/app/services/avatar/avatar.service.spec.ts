import { TestBed } from '@angular/core/testing';

import { ToDoEntryService } from './avatar.service';

describe('ToDoEntryService', () => {
  let service: ToDoEntryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToDoEntryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
