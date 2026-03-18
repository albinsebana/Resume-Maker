import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StyleConfig } from './style-config';

describe('StyleConfig', () => {
  let component: StyleConfig;
  let fixture: ComponentFixture<StyleConfig>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StyleConfig],
    }).compileComponents();

    fixture = TestBed.createComponent(StyleConfig);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
