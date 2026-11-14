
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  numberAttribute,
} from '@angular/core';

// ========================================
// Types
// ========================================

export type CxpIconMenuHistorySize =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl';

export type CxpIconMenuHistoryFill =
  | 'outline'
  | 'filled';

// ========================================
// Menu History Icon
// ========================================

@Component({
  selector: 'cxp-icon-menu-history',
  standalone: true,

  templateUrl: './cxp-icon-menu-history.html',
  styleUrl: './cxp-icon-menu-history.css',

  changeDetection: ChangeDetectionStrategy.OnPush,

  host: {
    '[attr.role]': 'ariaLabel ? "img" : null',
    '[attr.aria-label]': 'ariaLabel || null',
    '[attr.aria-hidden]': 'ariaLabel ? null : "true"',
  },
})
export class CxpIconMenuHistory {

  // ========================================
  // Appearance Inputs
  // ========================================

  @Input()
  size: CxpIconMenuHistorySize = 'xs';

  @Input()
  fill: CxpIconMenuHistoryFill = 'outline';

  @Input({ transform: numberAttribute })
  strokeWidth = 1.7;

  @Input()
  color = 'currentColor';

  // Decorative by default
  @Input()
  ariaLabel = '';

  // ========================================
  // Effective Stroke Width
  // ========================================

  get effectiveStrokeWidth(): number {
    return Number.isFinite(this.strokeWidth)
      ? Math.max(0.5, Math.min(4, this.strokeWidth))
      : 1.7;
  }
}
