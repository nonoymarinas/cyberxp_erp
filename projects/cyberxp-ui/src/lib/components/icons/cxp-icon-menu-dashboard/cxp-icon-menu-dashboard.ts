
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  numberAttribute,
} from '@angular/core';

// ========================================
// Types
// ========================================

export type CxpIconMenuDashboardSize =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl';

export type CxpIconMenuDashboardFill =
  | 'outline'
  | 'filled';

// ========================================
// Menu Dashboard Icon
// ========================================

@Component({
  selector: 'cxp-icon-menu-dashboard',
  standalone: true,

  templateUrl: './cxp-icon-menu-dashboard.html',
  styleUrl: './cxp-icon-menu-dashboard.css',

  changeDetection: ChangeDetectionStrategy.OnPush,

  host: {
    '[attr.role]': 'ariaLabel ? "img" : null',
    '[attr.aria-label]': 'ariaLabel || null',
    '[attr.aria-hidden]': 'ariaLabel ? null : "true"',
  },
})
export class CxpIconMenuDashboard {

  // ========================================
  // Appearance Inputs
  // ========================================

  @Input()
  size: CxpIconMenuDashboardSize = 'md';

  @Input()
  fill: CxpIconMenuDashboardFill = 'outline';

  @Input({ transform: numberAttribute })
  strokeWidth = 2;

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
      : 2;
  }
}
