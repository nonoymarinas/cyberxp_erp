import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import {
  CxpIconFill,
  CxpIconSize,
  CxpIconState,
} from '../../../exports/cxp-export.types';

@Component({
  selector: 'cxp-icon-atms-app',
  standalone: true,
  imports: [NgClass],
  templateUrl: './cxp-icon-atms-app.html',
  styleUrl: './cxp-icon-atms-app.css',
})
export class CxpIconAtmsApp {
  @Input() fill: CxpIconFill = 'filled';

  @Input() size: CxpIconSize = 'md';

  @Input() state: CxpIconState = 'default';
}