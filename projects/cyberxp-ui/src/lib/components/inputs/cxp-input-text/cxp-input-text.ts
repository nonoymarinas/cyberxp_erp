import { booleanAttribute, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'cxp-input-text',
  standalone: true,
  imports: [],
  templateUrl: './cxp-input-text.html',
  styleUrl: './cxp-input-text.css',
})
export class CxpInputText {
  /* Appearance */

  @Input()
  colorScheme: 'dark' | 'light' = 'dark';

  /* Input Properties */
  @Input()
  size: 'sm' | 'md' | 'lg' | 'xl' = 'md';

  @Input()
  type: 'text' | 'password' | 'email' | 'number' | 'search' | 'tel' | 'url' = 'text';

  @Input()
  value = '';

  @Input()
  placeholder = '';

  @Input()
  name = '';

  @Input()
  id = '';

  @Input()
  autocomplete = 'off';

  @Input()
  minlength?: number;

  @Input()
  maxlength?: number;

  @Input()
  pattern = '';

  /* Boolean Properties */

  @Input({ transform: booleanAttribute })
  disabled = false;

  @Input({ transform: booleanAttribute })
  readonly = false;

  @Input({ transform: booleanAttribute })
  required = false;

  @Input({ transform: booleanAttribute })
  autofocus = false;

  @Input({ transform: booleanAttribute })
  invalid = false;

  /* Events */

  @Output()
  valueChange = new EventEmitter<string>();

  @Output()
  focused = new EventEmitter<FocusEvent>();

  @Output()
  blurred = new EventEmitter<FocusEvent>();

  @Output()
  enterPressed = new EventEmitter<KeyboardEvent>();

  /* Event Handlers */

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;

    this.value = input.value;
    this.valueChange.emit(this.value);
  }

  onFocus(event: FocusEvent): void {
    this.focused.emit(event);
  }

  onBlur(event: FocusEvent): void {
    this.blurred.emit(event);
  }

  onEnter(event: KeyboardEvent): void {
    this.enterPressed.emit(event);
  }

  /* Password Visibility */

  passwordVisible = false;

  get inputType(): string {
    if (this.type !== 'password') {
      return this.type;
    }

    return this.passwordVisible ? 'text' : 'password';
  }

  get passwordHidden(): boolean {
    return !this.passwordVisible;
  }

  togglePasswordVisibility(): void {
    if (this.disabled || this.type !== 'password') {
      return;
    }

    this.passwordVisible = !this.passwordVisible;
  }
}
