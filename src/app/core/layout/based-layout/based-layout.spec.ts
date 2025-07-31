import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasedLayout } from './based-layout';

describe('BasedLayout', () => {
  let component: BasedLayout;
  let fixture: ComponentFixture<BasedLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasedLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasedLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
