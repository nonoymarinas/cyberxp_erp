import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'button-aut-md',
  standalone: true,
  imports: [],
  templateUrl: './button-aut-md.html',
  styleUrl: './button-aut-md.css',
})
export class ButtonAutMd {
  @Output() clicked = new EventEmitter<void>();

  onClick(): void {
    this.clicked.emit();
  }
}
