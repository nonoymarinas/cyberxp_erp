import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

// ========================================
// Types
// ========================================

export type CxpActionAlertVariant = 'danger' | 'success' | 'info' | 'warning' | 'neutral';

export type CxpActionAlertSize = 'xs' | 'sm' | 'md' | 'lg';

// ========================================
// Component
// ========================================

@Component({
  selector: 'cxp-action-alert-button',
  standalone: true,

  templateUrl: './cxp-action-alert-button.html',
  styleUrl: './cxp-action-alert-button.css',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CxpActionAlertButton {
  // ========================================
  // Inputs
  // ========================================

  readonly variant = input<CxpActionAlertVariant>('danger');

  readonly size = input<CxpActionAlertSize>('sm');

  readonly pulse = input<boolean>(false);

  readonly disabled = input<boolean>(false);

  readonly loading = input<boolean>(false);

  // ========================================
  // Outputs
  // ========================================

  readonly clicked = output<void>();

  // ========================================
  // Computed State
  // ========================================

  readonly isDisabled = computed(() => this.disabled() || this.loading());

  // ========================================
  // Click Handler
  // ========================================

  onClick(): void {
    if (this.isDisabled()) {
      return;
    }

    this.clicked.emit();
  }
}
