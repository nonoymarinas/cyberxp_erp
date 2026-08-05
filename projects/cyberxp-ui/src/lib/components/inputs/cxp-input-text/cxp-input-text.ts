import {
  booleanAttribute,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';

import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

import type {
  CxpInputSize,
  CxpInputType,
} from '../../../../lib/exports/cxp-export.types';

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

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private readonly cdr: ChangeDetectorRef) {}

  // ========================================
  // Inputs
  // ========================================

  @Input()
  get value(): string {
    return this.internalValue;
  }

  set value(value: string | null | undefined) {
    this.internalValue = value ?? '';
  }

  @Input()
  type: CxpInputType = 'text';

  @Input()
  size: CxpInputSize = 'md';

  @Input()
  name = '';

  @Input()
  placeholder = '';

  @Input()
  autocomplete = 'off';

  @Input({ transform: booleanAttribute })
  disabled = false;

  @Input({ transform: booleanAttribute })
  readonly = false;

  @Input({ transform: booleanAttribute })
  required = false;

  @Input({ transform: booleanAttribute })
  invalid = false;

  // ========================================
  // Outputs
  // ========================================

  @Output()
  valueChange = new EventEmitter<string>();

  @Output()
  focused = new EventEmitter<void>();

  @Output()
  blurred = new EventEmitter<void>();

  // ========================================
  // ControlValueAccessor
  // ========================================

  writeValue(value: string | null): void {
    this.internalValue = value ?? '';
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.markForCheck();
  }

  // ========================================
  // Events
  // ========================================

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;

    this.internalValue = input.value;

    // Update Angular Reactive Forms.
    this.onChange(this.internalValue);

    // Support [(value)] outside Reactive Forms.
    this.valueChange.emit(this.internalValue);
  }

  onFocus(): void {
    this.focused.emit();
  }

  onBlur(): void {
    // Mark the Angular FormControl as touched.
    this.onTouched();

    this.blurred.emit();
  }
}