import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutiveTemplate } from './executive-template';

describe('ExecutiveTemplate', () => {
  let component: ExecutiveTemplate;
  let fixture: ComponentFixture<ExecutiveTemplate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExecutiveTemplate],
    }).compileComponents();

    fixture = TestBed.createComponent(ExecutiveTemplate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
