import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { CxpButton } from '../../buttons';

@Component({
  selector: 'cxp-contact-list',
  standalone: true,
  imports: [CxpButton],
  templateUrl: './cxp-contact-list.html',
  styleUrl: './cxp-contact-list.css',
})
export class CxpContactList {
 
  @Input()
  value: string | number | null | undefined = '';

  @Input()
  buttonLabel = 'Edit';

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