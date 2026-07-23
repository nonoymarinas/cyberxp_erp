import {
  Component,
  input,
  output,
} from '@angular/core';


@Component({
  selector: 'cxp-modal-menu',
  standalone: true,
  imports: [],
  templateUrl: './cxp-modal-menu.html',
  styleUrl: './cxp-modal-menu.css',
})
export class CxpModalMenu {
  isOpen = input(false);

  title = input('');

  closeRequested = output<void>();

  close(): void {
    this.closeRequested.emit();
  }

  onOverlayClick(): void {
    this.close();
  }

  onMenuClick(event: MouseEvent): void {
    event.stopPropagation();
  }
}