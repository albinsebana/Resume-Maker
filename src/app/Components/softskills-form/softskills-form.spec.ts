import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftskillsForm } from './softskills-form';

describe('SoftskillsForm', () => {
  let component: SoftskillsForm;
  let fixture: ComponentFixture<SoftskillsForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoftskillsForm],
    }).compileComponents();

    fixture = TestBed.createComponent(SoftskillsForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
