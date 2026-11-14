
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  numberAttribute,
} from '@angular/core';

// ========================================
// Types
// ========================================

export type CxpIconMenuRecordsSize =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl';

export type CxpIconMenuRecordsFill =
  | 'outline'
  | 'filled';

// ========================================
// Menu Records Icon
// ========================================

@Component({
  selector: 'cxp-icon-menu-records',
  standalone: true,

  templateUrl: './cxp-icon-menu-records.html',
  styleUrl: './cxp-icon-menu-records.css',

  changeDetection: ChangeDetectionStrategy.OnPush,

  host: {
    '[attr.role]': 'ariaLabel ? "img" : null',
    '[attr.aria-label]': 'ariaLabel || null',
    '[attr.aria-hidden]': 'ariaLabel ? null : "true"',
  },
})
export class CxpIconMenuRecords {

  // ========================================
  // Appearance Inputs
  // ========================================

  @Input()
  size: CxpIconMenuRecordsSize = 'sm';

  @Input()
  fill: CxpIconMenuRecordsFill = 'outline';

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
