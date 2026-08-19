import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { CxpButton } from 'cyberxp-ui';

export type CxpContactListSize = 'xs' | 'sm' | 'md' | 'lg';

@Component({
  selector: 'cxp-contact-list',
  standalone: true,

  imports: [CxpButton],

  templateUrl: './cxp-contact-list.html',

  styleUrl: './cxp-contact-list.css',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CxpContactList {
  // ========================================
  // Inputs
  // ========================================

  @Input()
  value: string | null = null;

  @Input()
  buttonLabel = 'Select';

  @Input()
  size: CxpContactListSize = 'sm';

  @Input()
  disabled = false;

  // ========================================
  // Output
  // ========================================

  @Output()
  readonly selected = new EventEmitter<void>();

  // ========================================
  // Select
  // ========================================

  onSelect(): void {
    if (this.disabled) {
      return;
    }

    this.selected.emit();
  }
}
