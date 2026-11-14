
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  numberAttribute,
} from '@angular/core';

// ========================================
// Types
// ========================================

export type CxpIconMenuHomeSize =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl';

export type CxpIconMenuHomeFill =
  | 'outline'
  | 'filled';

// ========================================
// Menu Home Icon
// ========================================

@Component({
  selector: 'cxp-icon-menu-home',
  standalone: true,

  templateUrl: './cxp-icon-menu-home.html',
  styleUrl: './cxp-icon-menu-home.css',

  changeDetection: ChangeDetectionStrategy.OnPush,

  host: {
    '[attr.role]': 'ariaLabel ? "img" : null',
    '[attr.aria-label]': 'ariaLabel || null',
    '[attr.aria-hidden]': 'ariaLabel ? null : "true"',
  },
})
export class CxpIconMenuHome {

  // ========================================
  // Appearance Inputs
  // ========================================

  @Input()
  size: CxpIconMenuHomeSize = 'md';

  @Input()
  fill: CxpIconMenuHomeFill = 'outline';

  @Input({ transform: numberAttribute })
  strokeWidth = 1.7;

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
      : 1.7;
  }
}
