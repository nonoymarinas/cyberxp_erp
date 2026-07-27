import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
export type CxpButtonType = 'button' | 'submit' | 'reset';

export type CxpButtonVariant = 'primary' | 'secondary' | 'ghost';

export type CxpButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'cxp-button',
  standalone: true,
  imports:[RouterLink],
  templateUrl: './cxp-button.html',
  styleUrl: './cxp-button.css',
})
export class CxpButton {
  @Input() routerLink: string | any[] | null = null;
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
