
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  numberAttribute,
} from '@angular/core';

// ========================================
// Types
// ========================================

export type CxpIconHumanNewSize =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl';

export type CxpIconHumanNewFill =
  | 'outline'
  | 'filled';

// ========================================
// Human New Icon
// ========================================

@Component({
  selector: 'cxp-icon-human-new',
  standalone: true,

  templateUrl: './cxp-icon-human-new.html',
  styleUrl: './cxp-icon-human-new.css',

  changeDetection: ChangeDetectionStrategy.OnPush,

  host: {
    '[attr.role]': 'ariaLabel ? "img" : null',
    '[attr.aria-label]': 'ariaLabel || null',
    '[attr.aria-hidden]': 'ariaLabel ? null : "true"',
  },
})
export class CxpIconHumanNew {

  // ========================================
  // Appearance Inputs
  // ========================================

  @Input()
  size: CxpIconHumanNewSize = 'xs';

  @Input()
  fill: CxpIconHumanNewFill = 'outline';

  @Input({ transform: numberAttribute })
  strokeWidth = 1.7;

  @Input()
  color = 'currentColor';

  // Decorative by default
  @Input()
  ariaLabel = '';

  // ========================================
  // Computed Stroke
  // ========================================

  get effectiveStrokeWidth(): number {
    return Number.isFinite(this.strokeWidth)
      ? Math.max(0.5, Math.min(4, this.strokeWidth))
      : 1.7;
  }
}
