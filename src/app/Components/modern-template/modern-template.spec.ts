import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModernTemplate } from './modern-template';

describe('ModernTemplate', () => {
  let component: ModernTemplate;
  let fixture: ComponentFixture<ModernTemplate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModernTemplate],
    }).compileComponents();

    fixture = TestBed.createComponent(ModernTemplate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
