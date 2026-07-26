import { Component, Input } from '@angular/core';

export type CxpChevronDirection =
  | 'up'
  | 'down'
  | 'left'
  | 'right';

export type CxpChevronSize =
  | 'xxs'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl';

@Component({
  selector: 'cxp-icon-chevron-app',
  standalone: true,
  imports: [],
  templateUrl: './cxp-icon-chevron-app.html',
  styleUrl: './cxp-icon-chevron-app.css',
  host: {
    '[class.icon--xxs]': 'size === "xxs"',
    '[class.icon--xs]': 'size === "xs"',
    '[class.icon--sm]': 'size === "sm"',
    '[class.icon--md]': 'size === "md"',
    '[class.icon--lg]': 'size === "lg"',
    '[class.icon--xl]': 'size === "xl"',
    '[class.icon--disabled]': 'disabled',
    '[attr.aria-label]': 'ariaLabel',
    '[attr.aria-hidden]': 'ariaHidden',
    '[attr.role]': 'ariaHidden ? null : "img"',
  },
})
export class CxpIconChevronApp {
  @Input()
  direction: CxpChevronDirection = 'right';

  @Input()
  size: CxpChevronSize = 'sm';

  @Input()
  disabled = false;

  @Input()
  ariaLabel = 'Chevron icon';

  @Input()
  ariaHidden = true;

  get transform(): string {
    switch (this.direction) {
      case 'up':
        return 'rotate(-90 12 12)';

      case 'down':
        return 'rotate(90 12 12)';

      case 'left':
        return 'rotate(180 12 12)';

      case 'right':
      default:
        return 'rotate(0 12 12)';
    }
  }
}