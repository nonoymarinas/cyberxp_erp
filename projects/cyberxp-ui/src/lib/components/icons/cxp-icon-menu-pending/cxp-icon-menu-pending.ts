
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  numberAttribute,
} from '@angular/core';

// ========================================
// Types
// ========================================

export type CxpIconMenuPendingSize =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl';

export type CxpIconMenuPendingFill =
  | 'outline'
  | 'filled';

// ========================================
// Menu Pending Icon
// ========================================

@Component({
  selector: 'cxp-icon-menu-pending',
  standalone: true,

  templateUrl: './cxp-icon-menu-pending.html',
  styleUrl: './cxp-icon-menu-pending.css',

  changeDetection: ChangeDetectionStrategy.OnPush,

  host: {
    '[attr.role]': 'ariaLabel ? "img" : null',
    '[attr.aria-label]': 'ariaLabel || null',
    '[attr.aria-hidden]': 'ariaLabel ? null : "true"',
  },
})
export class CxpIconMenuPending {

  // ========================================
  // Appearance Inputs
  // ========================================

  @Input()
  size: CxpIconMenuPendingSize = 'sm';

  @Input()
  fill: CxpIconMenuPendingFill = 'outline';

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
