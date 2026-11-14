
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  numberAttribute,
} from '@angular/core';

// ========================================
// Types
// ========================================

export type CxpIconMenuRehireSize =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl';

export type CxpIconMenuRehireFill =
  | 'outline'
  | 'filled';

// ========================================
// Menu Rehire Icon
// ========================================

@Component({
  selector: 'cxp-icon-menu-rehire',
  standalone: true,

  templateUrl: './cxp-icon-menu-rehire.html',
  styleUrl: './cxp-icon-menu-rehire.css',

  changeDetection: ChangeDetectionStrategy.OnPush,

  host: {
    '[attr.role]': 'ariaLabel ? "img" : null',
    '[attr.aria-label]': 'ariaLabel || null',
    '[attr.aria-hidden]': 'ariaLabel ? null : "true"',
  },
})
export class CxpIconMenuRehire {

  // ========================================
  // Appearance Inputs
  // ========================================

  @Input()
  size: CxpIconMenuRehireSize = 'md';

  @Input()
  fill: CxpIconMenuRehireFill = 'outline';

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
