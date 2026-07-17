import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

export type CxpButtonType = 'button' | 'submit' | 'reset';

export type CxpButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost';

export type CxpButtonSize =
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl';

@Component({
  selector: 'cxp-button',
  standalone: true,
  templateUrl: './cxp-button.html',
  styleUrl: './cxp-button.css',
})
export class CxpButton {
  @Input() type: CxpButtonType = 'button';

  @Input() variant: CxpButtonVariant = 'primary';

  @Input() size: CxpButtonSize = 'md';

  @Input() disabled = false;

  @Input() loading = false;

  @Input() fullWidth = false;

  @Input() ariaLabel: string | null = null;

  @Output() clicked = new EventEmitter<MouseEvent>();

  onClick(event: MouseEvent): void {
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    this.clicked.emit(event);
  }
}