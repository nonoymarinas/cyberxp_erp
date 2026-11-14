
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  numberAttribute,
} from '@angular/core';

// ========================================
// Types
// ========================================

export type CxpIconMenuReactivationSize =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl';

export type CxpIconMenuReactivationFill =
  | 'outline'
  | 'filled';

// ========================================
// Menu Reactivation Icon
// ========================================

@Component({
  selector: 'cxp-icon-menu-reactivation',
  standalone: true,

  templateUrl: './cxp-icon-menu-reactivation.html',
  styleUrl: './cxp-icon-menu-reactivation.css',

  changeDetection: ChangeDetectionStrategy.OnPush,

  host: {
    '[attr.role]': 'ariaLabel ? "img" : null',
    '[attr.aria-label]': 'ariaLabel || null',
    '[attr.aria-hidden]': 'ariaLabel ? null : "true"',
  },
})
export class CxpIconMenuReactivation {

  // ========================================
  // Appearance Inputs
  // ========================================

  @Input()
  size: CxpIconMenuReactivationSize = 'md';

  @Input()
  fill: CxpIconMenuReactivationFill = 'outline';

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
