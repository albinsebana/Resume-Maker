import { TestBed } from '@angular/core/testing';

import { PrintDownload } from './print-download';

describe('PrintDownload', () => {
  let service: PrintDownload;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrintDownload);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
