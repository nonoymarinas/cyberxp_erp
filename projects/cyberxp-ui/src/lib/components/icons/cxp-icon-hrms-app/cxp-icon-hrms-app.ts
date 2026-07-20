import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import {
  CxpIconFill,
  CxpIconSize,
  CxpIconState,
} from '../cxp-icon.types';

@Component({
  selector: 'cxp-icon-hrms-app',
  standalone: true,
  imports: [NgClass],
  templateUrl: './cxp-icon-hrms-app.html',
  styleUrl: './cxp-icon-hrms-app.css',
})
export class CxpIconHrmsApp {
  @Input() fill: CxpIconFill = 'filled';

  @Input() size: CxpIconSize = 'md';

  @Input() state: CxpIconState = 'default';
}