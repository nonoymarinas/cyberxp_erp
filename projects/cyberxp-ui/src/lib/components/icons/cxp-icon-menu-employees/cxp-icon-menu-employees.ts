
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  numberAttribute,
} from '@angular/core';

// ========================================
// Types
// ========================================

export type CxpIconMenuEmployeesSize =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl';

export type CxpIconMenuEmployeesFill =
  | 'outline'
  | 'filled';

// ========================================
// Menu Employees Icon
// ========================================

@Component({
  selector: 'cxp-icon-menu-employees',
  standalone: true,

  templateUrl: './cxp-icon-menu-employees.html',
  styleUrl: './cxp-icon-menu-employees.css',

  changeDetection: ChangeDetectionStrategy.OnPush,

  host: {
    '[attr.role]': 'ariaLabel ? "img" : null',
    '[attr.aria-label]': 'ariaLabel || null',
    '[attr.aria-hidden]': 'ariaLabel ? null : "true"',
  },
})
export class CxpIconMenuEmployees {

  // ========================================
  // Appearance Inputs
  // ========================================

  @Input()
  size: CxpIconMenuEmployeesSize = 'md';

  @Input()
  fill: CxpIconMenuEmployeesFill = 'outline';

  @Input({ transform: numberAttribute })
  strokeWidth = 1;

  @Input()
  color = 'currentColor';

  @Input()
  ariaLabel = '';

  // ========================================
  // Effective Stroke Width
  // ========================================

  get effectiveStrokeWidth(): number {
    return Number.isFinite(this.strokeWidth)
      ? Math.max(0.5, Math.min(4, this.strokeWidth))
      : 1;
  }
}
