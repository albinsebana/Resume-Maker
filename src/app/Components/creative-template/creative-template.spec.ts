import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreativeTemplate } from './creative-template';

describe('CreativeTemplate', () => {
  let component: CreativeTemplate;
  let fixture: ComponentFixture<CreativeTemplate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreativeTemplate],
    }).compileComponents();

    fixture = TestBed.createComponent(CreativeTemplate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
