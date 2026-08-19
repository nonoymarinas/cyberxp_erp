import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';

import {
  CxpIcon,
} from '../cxp-icon/cxp-icon';

@Component({
  selector: 'cxp-icon-scope',
  standalone: true,

  imports: [
    CxpIcon,
  ],

  templateUrl:
    './cxp-icon-scope.html',

  styleUrl:
    './cxp-icon-scope.css',

  changeDetection:
    ChangeDetectionStrategy.OnPush,
})
export class CxpIconScope {

  // ========================================
  // Label
  // ========================================

  @Input()
  label:
    string | null = null;


  // ========================================
  // Icon
  // ========================================

  @Input()
  icon:
    string | null = null;
}