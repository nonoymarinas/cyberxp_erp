import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'button-login',
  standalone: true,
  imports: [],
  templateUrl: './button-login.html',
  styleUrl: './button-login.css',
})
export class ButtonLogin {

  @Input() theme: 'dark' | 'light' = 'dark';

  @Input() disabled = false;

  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  @Output() clicked = new EventEmitter<MouseEvent>();

  onClick(event: MouseEvent): void {
    if (this.disabled) return;

    this.clicked.emit(event);
  }

}