
import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';

// ========================================
// Types
// ========================================

export type CxpIconHumanPlusSize =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl';

export type CxpIconHumanPlusFill =
  | 'outline'
  | 'filled';

// ========================================
// Human Plus Icon
// ========================================

@Component({
  selector: 'cxp-icon-human-plus',
  standalone: true,

  templateUrl: './cxp-icon-human-plus.html',
  styleUrl: './cxp-icon-human-plus.css',

  changeDetection: ChangeDetectionStrategy.OnPush,

  host: {
    '[attr.role]': '"img"',
    '[attr.aria-label]': 'ariaLabel',
  },
})
export class CxpIconHumanPlus {

  // ========================================
  // Inputs
  // ========================================

  @Input()
  size: CxpIconHumanPlusSize = 'xs';

  @Input()
  fill: CxpIconHumanPlusFill = 'outline';

  @Input()
  strokeWidth = 1.7;

  @Input()
  color = 'currentColor';

  @Input()
  ariaLabel = 'Add person';

  // ========================================
  // Stroke Width
  // ========================================

  get effectiveStrokeWidth(): number {
    return Math.max(0.5, Math.min(4, this.strokeWidth));
  }
}
