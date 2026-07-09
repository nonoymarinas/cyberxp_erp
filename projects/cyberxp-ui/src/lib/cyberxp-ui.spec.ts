import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CyberxpUi } from './cyberxp-ui';

describe('CyberxpUi', () => {
  let component: CyberxpUi;
  let fixture: ComponentFixture<CyberxpUi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CyberxpUi],
    }).compileComponents();

    fixture = TestBed.createComponent(CyberxpUi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
