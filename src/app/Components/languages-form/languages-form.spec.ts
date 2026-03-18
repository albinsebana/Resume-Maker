import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguagesForm } from './languages-form';

describe('LanguagesForm', () => {
  let component: LanguagesForm;
  let fixture: ComponentFixture<LanguagesForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguagesForm],
    }).compileComponents();

    fixture = TestBed.createComponent(LanguagesForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
