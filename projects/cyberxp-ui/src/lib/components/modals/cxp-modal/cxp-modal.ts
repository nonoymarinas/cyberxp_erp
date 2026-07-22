import { NgClass } from '@angular/common';
import {
  AfterViewChecked,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

export type CxpModalSize = 'full' | 'sm' | 'md' | 'lg' | 'xl';

export type CxpModalCloseSource =
  | 'overlay'
  | 'close-button'
  | 'escape';

@Component({
  selector: 'cxp-modal',
  standalone: true,
  imports: [NgClass],
  templateUrl: './cxp-modal.html',
  styleUrl: './cxp-modal.css',
})
export class CxpModal implements OnChanges, AfterViewChecked {
  /* ========================================
     State
     ======================================== */

  @Input()
  isOpen = false;

  /* ========================================
     Content
     ======================================== */

  @Input()
  title = '';

  /* ========================================
     Appearance
     ======================================== */

  @Input()
  size: CxpModalSize = 'md';

  @Input()
  scrollable = true;

  /* ========================================
     Sections
     ======================================== */

  @Input()
  showHeader = true;

  @Input()
  showIcon = false;

  @Input()
  showFooter = true;

  @Input()
  showCloseButton = true;

  /* ========================================
     Closing Behavior
     ======================================== */

  @Input()
  closeOnOverlayClick = true;

  @Input()
  closeOnEscape = true;

  /* ========================================
     Events
     ======================================== */

  @Output()
  readonly closed = new EventEmitter<CxpModalCloseSource>();

  /* ========================================
     Element References
     ======================================== */

  @ViewChild('dialog')
  private dialog?: ElementRef<HTMLElement>;

  /* ========================================
     Accessibility IDs
     ======================================== */

  private static nextId = 0;

  private readonly modalId = ++CxpModal.nextId;

  readonly titleId = `cxp-modal-title-${this.modalId}`;

  readonly descriptionId = `cxp-modal-description-${this.modalId}`;

  /* ========================================
     Internal State
     ======================================== */

  private shouldFocusDialog = false;

  private previouslyFocusedElement: HTMLElement | null = null;

  /* ========================================
     Lifecycle
     ======================================== */

  ngOnChanges(changes: SimpleChanges): void {
    const isOpenChange = changes['isOpen'];

    if (!isOpenChange) {
      return;
    }

    if (this.isOpen) {
      this.previouslyFocusedElement =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;

      this.shouldFocusDialog = true;

      return;
    }

    this.restorePreviousFocus();
  }

  ngAfterViewChecked(): void {
    if (!this.shouldFocusDialog || !this.dialog) {
      return;
    }

    this.shouldFocusDialog = false;

    const firstFocusableElement = this.getFocusableElements()[0];

    if (firstFocusableElement) {
      firstFocusableElement.focus();
      return;
    }

    this.dialog.nativeElement.focus();
  }

  /* ========================================
     Close Actions
     ======================================== */

  requestClose(source: CxpModalCloseSource): void {
    this.closed.emit(source);
  }

  onOverlayMouseDown(event: MouseEvent): void {
    if (!this.closeOnOverlayClick) {
      return;
    }

    if (event.target !== event.currentTarget) {
      return;
    }

    this.requestClose('overlay');
  }

  /* ========================================
     Keyboard Handling
     ======================================== */

  @HostListener('document:keydown', ['$event'])
  onDocumentKeyDown(event: KeyboardEvent): void {
    if (!this.isOpen) {
      return;
    }

    if (event.key === 'Escape') {
      this.handleEscapeKey(event);
      return;
    }

    if (event.key === 'Tab') {
      this.trapFocus(event);
    }
  }

  private handleEscapeKey(event: KeyboardEvent): void {
    if (!this.closeOnEscape) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    this.requestClose('escape');
  }

  private trapFocus(event: KeyboardEvent): void {
    const focusableElements = this.getFocusableElements();

    if (focusableElements.length === 0) {
      event.preventDefault();
      this.dialog?.nativeElement.focus();
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement =
      focusableElements[focusableElements.length - 1];

    const activeElement = document.activeElement;

    if (event.shiftKey && activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
      return;
    }

    if (!event.shiftKey && activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }

  private getFocusableElements(): HTMLElement[] {
    const dialogElement = this.dialog?.nativeElement;

    if (!dialogElement) {
      return [];
    }

    const selector = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]',
    ].join(',');

    return Array.from(
      dialogElement.querySelectorAll<HTMLElement>(selector),
    ).filter((element) => {
      return (
        !element.hasAttribute('disabled') &&
        element.getAttribute('aria-hidden') !== 'true' &&
        element.offsetParent !== null
      );
    });
  }

  private restorePreviousFocus(): void {
    this.previouslyFocusedElement?.focus();
    this.previouslyFocusedElement = null;
  }
}