import { Component, EventEmitter, Input, Output } from '@angular/core';

export type CxpInputSize = 'sm' | 'md' | 'lg' | 'xl';

export type CxpInputType =
  | 'text'
  | 'password'
  | 'email'
  | 'number'
  | 'search'
  | 'tel'
  | 'url';

@Component({
  selector: 'cxp-input-text',
  standalone: true,
  templateUrl: './cxp-input-text.html',
  styleUrl: './cxp-input-text.css',
})
export class CxpInputText {
  @Input() value = '';

  @Input() type: CxpInputType = 'text';

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