
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  booleanAttribute,
  inject,
  signal,
  Optional,
  SkipSelf,
} from '@angular/core';

import {
  RouterLink,
  RouterLinkActive,
} from '@angular/router';

// ========================================
// Sidebar Menu Item
// ========================================

@Component({
  selector: 'cxp-menu-sidebar-item',
  standalone: true,

  imports: [
    RouterLink,
    RouterLinkActive,
  ],

  templateUrl: './cxp-menu-sidebar-item.html',
  styleUrl: './cxp-menu-sidebar-item.css',

  changeDetection: ChangeDetectionStrategy.OnPush,

  host: {
    '[class.cxp-menu-sidebar-item--nested]': 'isNested',
    '[class.cxp-menu-sidebar-item--group]': 'group',
  },
})
export class CxpMenuSidebarItem {

  // ========================================
  // Navigation Inputs
  // ========================================

  @Input()
  route = '';

  @Input({ transform: booleanAttribute })
  exact = false;

  @Input({ transform: booleanAttribute })
  disabled = false;

  @Input()
  ariaLabel?: string;

  // ========================================
  // Group Inputs
  // ========================================

  @Input({ transform: booleanAttribute })
  group = false;

  @Input({ transform: booleanAttribute })
  set expanded(value: boolean) {
    this.isExpanded.set(value);
  }

  // ========================================
  // Parent Menu
  // ========================================

  private readonly parentMenu = inject(
    CxpMenuSidebarItem,
    {
      optional: true,
      skipSelf: true,
    },
  );

  readonly isNested = this.parentMenu !== null;

  // ========================================
  // State
  // ========================================

  readonly isExpanded = signal(false);

  // ========================================
  // Toggle Group
  // ========================================

  toggleGroup(): void {
    if (!this.group || this.disabled) {
      return;
    }

    this.isExpanded.update(value => !value);
  }

  // ========================================
  // Handle Click
  // ========================================

  handleClick(event: MouseEvent): void {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    if (this.group) {
      event.preventDefault();
      this.toggleGroup();
    }
  }

  // ========================================
  // Keyboard Interaction
  // ========================================

  handleKeydown(event: KeyboardEvent): void {
    if (!this.group || this.disabled) {
      return;
    }

    if (
      event.key === 'Enter' ||
      event.key === ' '
    ) {
      event.preventDefault();
      this.toggleGroup();
    }
  }
}
