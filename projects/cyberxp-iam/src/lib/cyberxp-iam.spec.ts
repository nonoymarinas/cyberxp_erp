import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CyberxpIam } from './cyberxp-iam';

describe('CyberxpIam', () => {
  let component: CyberxpIam;
  let fixture: ComponentFixture<CyberxpIam>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CyberxpIam],
    }).compileComponents();

    fixture = TestBed.createComponent(CyberxpIam);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
