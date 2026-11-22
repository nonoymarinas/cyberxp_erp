
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

@Component({
  selector: 'cxp-icon-onboarding',
  standalone: true,

  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      [attr.width]="pixelSize()"
      [attr.height]="pixelSize()"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      [attr.stroke-width]="strokeWidth()"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <!-- Clipboard Body -->
      <rect
        x="4"
        y="4"
        width="16"
        height="18"
        rx="2"
        [attr.fill]="fill() === 'filled'
          ? 'currentColor'
          : 'none'"
      />

      <!-- Clipboard Header -->
      <rect
        x="9"
        y="2"
        width="6"
        height="4"
        rx="1"
        [attr.fill]="fill() === 'filled'
          ? 'currentColor'
          : 'none'"
        [attr.stroke]="fill() === 'filled'
          ? 'var(--cxp-icon-detail-color, white)'
          : 'currentColor'"
      />

      <!-- Checklist -->
      <path
        d="M8 12l2 2 5-5"
        [attr.stroke]="fill() === 'filled'
          ? 'var(--cxp-icon-detail-color, white)'
          : 'currentColor'"
      />

      <!-- Requirement Lines -->
      <path
        d="M8 18h8"
        [attr.stroke]="fill() === 'filled'
          ? 'var(--cxp-icon-detail-color, white)'
          : 'currentColor'"
      />
    </svg>
  `,

  styles: [`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      line-height: 0;
      vertical-align: middle;
    }

    svg {
      display: block;
    }
  `],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CxpIconOnboarding {

  readonly size =
    input<'xs' | 'sm' | 'md' | 'lg'>('md');

  readonly fill =
    input<'outline' | 'filled'>('outline');

  readonly strokeWidth =
    input<number>(1.5);

  readonly pixelSize = computed(() => ({
    xs: 14,
    sm: 18,
    md: 22,
    lg: 28,
  })[this.size()]);
}
