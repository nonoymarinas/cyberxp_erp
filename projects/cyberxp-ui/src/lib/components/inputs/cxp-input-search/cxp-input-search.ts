import { Component, EventEmitter, Input, Output } from '@angular/core';

import type{CxpInputSize} from '../../../../lib/exports/cxp-export.types';
import type{CxpInputType} from '../../../../lib/exports/cxp-export.types';


@Component({
  selector: 'cxp-input-search',
  standalone: true,
  templateUrl: './cxp-input-search.html',
  styleUrl: './cxp-input-search.css',
})
export class CxpInputSearch {
  @Input() value = '';

  @Input() size: CxpInputSize = 'md';

  @Input() name = '';

  @Input() placeholder = '';

  @Input() autocomplete = 'off';

  @Input() disabled = false;

  @Input() readonly = false;

  @Input() required = false;

  @Input() invalid = false;

  @Output() valueChange = new EventEmitter<string>();

  @Output() focused = new EventEmitter<void>();

  @Output() blurred = new EventEmitter<void>();

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;

    this.value = input.value;
    this.valueChange.emit(this.value);
  }

  onFocus(): void {
    this.focused.emit();
  }

  onBlur(): void {
    this.blurred.emit();
  }
}