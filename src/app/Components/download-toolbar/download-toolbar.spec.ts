import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadToolbar } from './download-toolbar';

describe('DownloadToolbar', () => {
  let component: DownloadToolbar;
  let fixture: ComponentFixture<DownloadToolbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DownloadToolbar],
    }).compileComponents();

    fixture = TestBed.createComponent(DownloadToolbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
