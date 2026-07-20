import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  CxpIconFill,
  CxpIconSize,
  CxpIconState,
} from '../cxp-icon.types';

@Component({
  selector: 'cxp-icon-tnms-app',
  standalone: true,
  imports: [NgClass],
  templateUrl: './cxp-icon-tnms-app.html',
  styleUrl: './cxp-icon-tnms-app.css',
})
export class CxpIconTnmsApp {
  /**
   * Controls whether the SVG artwork is filled or outlined.
   */
  @Input() fill: CxpIconFill = 'filled';

  /**
   * Controls the rendered width and height.
   */
  @Input() size: CxpIconSize = 'md';

  /**
   * Only the default state responds to hover, press and focus.
   */
  @Input() state: CxpIconState = 'default';

  /**
   * Decorative icons are hidden from screen readers.
   */
  @Input() decorative = true;

  /**
   * Required when decorative is false.
   */
  @Input() ariaLabel = 'TNMS application';
}