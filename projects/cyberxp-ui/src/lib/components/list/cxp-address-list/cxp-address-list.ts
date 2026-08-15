import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { CxpButton } from '../../buttons';

@Component({
  selector: 'cxp-address-list',
  standalone: true,
  imports: [CxpButton],
  templateUrl: './cxp-address-list.html',
  styleUrl: './cxp-address-list.css',
})
export class CxpAddressList {
  @Input()
  label = 'Present Address';

  @Input()
  value: string | number | null | undefined = '';

  @Input()
  buttonLabel = 'Select';

  @Input()
  size: 'sm' | 'md' | 'lg' | 'xl' = 'md';

  @Input()
  disabled = false;

  @Input()
  invalid = false;

  @Output()
  selected = new EventEmitter<void>();

  onSelect(): void {
    if (this.disabled) {
      return;
    }

    this.selected.emit();
  }
}