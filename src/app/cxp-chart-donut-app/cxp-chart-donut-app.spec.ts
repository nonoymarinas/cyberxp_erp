import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CxpChartDonutApp } from './cxp-chart-donut-app';

describe('CxpChartDonutApp', () => {
  let component: CxpChartDonutApp;
  let fixture: ComponentFixture<CxpChartDonutApp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CxpChartDonutApp],
    }).compileComponents();

    fixture = TestBed.createComponent(CxpChartDonutApp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
