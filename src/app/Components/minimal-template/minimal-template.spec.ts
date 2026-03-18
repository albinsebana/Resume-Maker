import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinimalTemplate } from './minimal-template';

describe('MinimalTemplate', () => {
  let component: MinimalTemplate;
  let fixture: ComponentFixture<MinimalTemplate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinimalTemplate],
    }).compileComponents();

    fixture = TestBed.createComponent(MinimalTemplate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
