import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'cxp-button-login',
  standalone: true,
  imports: [],
  templateUrl: './cxp-button-login.html',
  styleUrl: './cxp-button-login.css',
})
export class CxpButtonLogin {

  @Input() theme: 'dark' | 'light' = 'dark';

  @Input() disabled = false;

  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  @Output() clicked = new EventEmitter<MouseEvent>();

  onClick(event: MouseEvent): void {
    if (this.disabled) return;

    this.clicked.emit(event);
  }

}