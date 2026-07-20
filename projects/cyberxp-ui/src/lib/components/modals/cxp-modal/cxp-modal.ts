import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, HostListener } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'cxp-modal',
  standalone: true,
  imports: [NgClass],
  templateUrl: './cxp-modal.html',
  styleUrl: './cxp-modal.css',
})
export class CxpModal {
  @Input() isOpen = false;

  @Input() title = '';

  @Input() size: 'full' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

  @Input() scrollable = true;

  @Input() showHeader = true;

  @Input() showFooter = true;

  @Input() showCloseButton = true;
  @Input() closeOnOverlayClick = true;

  @Input() closeOnEscape = true;


  @Output() closed = new EventEmitter<'overlay' | 'close-button' | 'escape'>();

  @ViewChild('dialog')
  dialog?: ElementRef<HTMLElement>;

  private static nextId = 0;

  private readonly modalId = ++CxpModal.nextId;

  readonly titleId = `cxp-modal-title-${this.modalId}`;

  readonly descriptionId = `cxp-modal-description-${this.modalId}`;

  requestClose(source: 'overlay' | 'close-button' | 'escape'): void {
    this.closed.emit(source);
  }
  @HostListener('document:keydown', ['$event'])
  onDocumentKeyDown(event: KeyboardEvent): void {
    if (!this.isOpen) {
      return;
    }

    if (event.key === 'Escape' && this.closeOnEscape) {
      event.preventDefault();
      this.requestClose('escape');
    }

    if (event.key === 'Tab') {
      this.trapFocus(event);
    }
  }

  private trapFocus(event: KeyboardEvent): void {
    // Your existing focus trap code
  }
  onOverlayMouseDown(event: MouseEvent): void {
    if (this.closeOnOverlayClick && event.target === event.currentTarget) {
      this.requestClose('overlay');
    }
  }

  
}
