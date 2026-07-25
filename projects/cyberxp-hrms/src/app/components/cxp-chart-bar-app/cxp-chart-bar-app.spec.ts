import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CxpChartBarApp } from './cxp-chart-bar-app';

describe('CxpChartDonutApp', () => {
  let component: CxpChartBarApp;
  let fixture: ComponentFixture<CxpChartBarApp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CxpChartBarApp],
    }).compileComponents();

    fixture = TestBed.createComponent(CxpChartBarApp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
