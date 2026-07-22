import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CxpIconBurgerNav } from '../../icons/cxp-icon-burger-nav/cxp-icon-burger-nav';

@Component({
  selector: 'cxp-layout-main',
  standalone: true,
  imports: [RouterOutlet,CxpIconBurgerNav],
  templateUrl: './cxp-layout-main.html',
  styleUrl: './cxp-layout-main.css',
})
export class CxpLayoutMain implements OnChanges, OnDestroy {
  /* ========================================
   * Layout Configuration
   * ======================================== */

  @Input()
  headerHeight = 50;

  @Input()
  footerHeight = 40;

  /* ========================================
   * Sidebar Configuration
   * ======================================== */

  @Input()
  sidebarWidth = 260;

  @Input()
  sidebarMinWidth = 180;

  @Input()
  sidebarMaxWidth = 420;

  @Input()
  sidebarWidthMobile = 260;

  @Input()
  sidebarResizable = true;

  @Input()
  sidebarResizeStep = 10;

  /* ========================================
   * Sidebar State
   * ======================================== */

  @Input()
  sidebarOpen = false;

  @Output()
  readonly sidebarOpenChange = new EventEmitter<boolean>();

  @Output()
  readonly sidebarWidthChange = new EventEmitter<number>();

  @Output()
  readonly sidebarResizeStart = new EventEmitter<number>();

  @Output()
  readonly sidebarResizeEnd = new EventEmitter<number>();

  currentSidebarWidth = this.sidebarWidth;

  private resizing = false;

  private pointerId: number | null = null;

  private startX = 0;

  private startWidth = 0;

  /* ========================================
   * Lifecycle
   * ======================================== */

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['sidebarWidth'] ||
      changes['sidebarMinWidth'] ||
      changes['sidebarMaxWidth']
    ) {
      this.validateSidebarWidths();

      this.currentSidebarWidth = this.clampWidth(
        this.sidebarWidth,
      );
    }
  }

  ngOnDestroy(): void {
    document.body.classList.remove('cxp-sidebar-resizing');
  }

  /* ========================================
   * Mobile Sidebar
   * ======================================== */

  openSidebar(): void {
    if (this.sidebarOpen) {
      return;
    }

    this.sidebarOpen = true;
    this.sidebarOpenChange.emit(true);
  }

  closeSidebar(): void {
    if (!this.sidebarOpen) {
      return;
    }

    this.sidebarOpen = false;
    this.sidebarOpenChange.emit(false);
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
    this.sidebarOpenChange.emit(this.sidebarOpen);
  }

  /* ========================================
   * Sidebar Resize
   * ======================================== */

  startSidebarResize(event: PointerEvent): void {
    if (!this.sidebarResizable) {
      return;
    }

    if (event.button !== 0) {
      return;
    }

    event.preventDefault();

    this.resizing = true;

    this.pointerId = event.pointerId;

    this.startX = event.clientX;

    this.startWidth = this.currentSidebarWidth;

    const handle = event.currentTarget;

    if (handle instanceof HTMLElement) {
      handle.setPointerCapture(event.pointerId);
    }

    document.body.classList.add('cxp-sidebar-resizing');

    this.sidebarResizeStart.emit(this.currentSidebarWidth);
  }

  @HostListener('document:pointermove', ['$event'])
  onPointerMove(event: PointerEvent): void {
    if (!this.resizing) {
      return;
    }

    if (
      this.pointerId !== null &&
      event.pointerId !== this.pointerId
    ) {
      return;
    }

    const delta = event.clientX - this.startX;

    this.setSidebarWidth(this.startWidth + delta);
  }

  @HostListener('document:pointerup', ['$event'])
  onPointerUp(event: PointerEvent): void {
    if (
      this.pointerId !== null &&
      event.pointerId !== this.pointerId
    ) {
      return;
    }

    this.stopSidebarResize();
  }

  @HostListener('document:pointercancel')
  @HostListener('window:blur')
  stopSidebarResize(): void {
    if (!this.resizing) {
      return;
    }

    this.resizing = false;

    this.pointerId = null;

    document.body.classList.remove('cxp-sidebar-resizing');

    this.sidebarResizeEnd.emit(this.currentSidebarWidth);
  }

  /* ========================================
   * Keyboard Resize
   * ======================================== */

  resizeSidebarWithKeyboard(event: KeyboardEvent): void {
    if (!this.sidebarResizable) {
      return;
    }

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();

        this.setSidebarWidth(
          this.currentSidebarWidth - this.sidebarResizeStep,
        );
        break;

      case 'ArrowRight':
        event.preventDefault();

        this.setSidebarWidth(
          this.currentSidebarWidth + this.sidebarResizeStep,
        );
        break;

      case 'Home':
        event.preventDefault();

        this.setSidebarWidth(this.sidebarMinWidth);
        break;

      case 'End':
        event.preventDefault();

        this.setSidebarWidth(this.sidebarMaxWidth);
        break;
    }
  }

  /* ========================================
   * Helpers
   * ======================================== */

  private setSidebarWidth(width: number): void {
    const value = this.clampWidth(width);

    if (value === this.currentSidebarWidth) {
      return;
    }

    this.currentSidebarWidth = value;

    this.sidebarWidthChange.emit(value);
  }

  private clampWidth(width: number): number {
    return Math.max(
      this.sidebarMinWidth,
      Math.min(this.sidebarMaxWidth, width),
    );
  }

  private validateSidebarWidths(): void {
    this.sidebarMinWidth = Math.max(0, this.sidebarMinWidth);

    this.sidebarMaxWidth = Math.max(
      this.sidebarMinWidth,
      this.sidebarMaxWidth,
    );

    this.sidebarWidth = this.clampWidth(this.sidebarWidth);
  }
}