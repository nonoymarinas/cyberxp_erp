import {
  booleanAttribute,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import type { CxpInputSize, CxpInputType } from '../../../../lib/exports/cxp-export.types';

@Component({
  selector: 'cxp-input-text',
  standalone: true,
  templateUrl: './cxp-input-text.html',
  styleUrl: './cxp-input-text.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CxpInputText),
      multi: true,
    },
  ],
})
export class CxpInputText implements ControlValueAccessor {
  private internalValue = '';

  /*
   * Disabled state coming from Angular Forms:
   * control.disable() / control.enable()
   */
  private formDisabled = false;

  /*
   * Disabled state supplied directly to the component:
   * <cxp-input-text [disabled]="true">
   */
  @Input({ transform: booleanAttribute })
  disabled = false;

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  @Input()
  get value(): string {
    return this.internalValue;
  }

  set value(value: string | null | undefined) {
    this.internalValue = value ?? '';
  }

  @Input() type: CxpInputType = 'text';

  @Input() size: CxpInputSize = 'md';

  @Input() name = '';

  @Input() placeholder = '';

  @Input() autocomplete = 'off';

  @Input({ transform: booleanAttribute })
  readonly = false;

  @Input({ transform: booleanAttribute })
  required = false;

  @Input({ transform: booleanAttribute })
  invalid = false;

  @Output() valueChange = new EventEmitter<string>();

  @Output() focused = new EventEmitter<void>();

  @Output() blurred = new EventEmitter<void>();

  get isDisabled(): boolean {
    return this.disabled || this.formDisabled;
  }

  writeValue(value: string | null): void {
    this.internalValue = value ?? '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    console.log('TEXT form disabled:', isDisabled);

    this.formDisabled = isDisabled;
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;

    this.internalValue = input.value;

    this.onChange(this.internalValue);
    this.valueChange.emit(this.internalValue);
  }

  onFocus(): void {
    this.focused.emit();
  }

  onBlur(): void {
    this.onTouched();
    this.blurred.emit();
  }
}
