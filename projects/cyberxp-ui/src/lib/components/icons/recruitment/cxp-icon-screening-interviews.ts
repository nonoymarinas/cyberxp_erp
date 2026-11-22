
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

@Component({
  selector: 'cxp-icon-screening-interviews',
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
      <!-- Interview Panel -->
      <rect
        x="3" y="4"
        width="18" height="15"
        rx="2"
        [attr.fill]="fill() === 'filled'
          ? 'currentColor'
          : 'none'"
      />

      <!-- Panel Stand -->
      <path
        d="M8 22v-3M16 22v-3M7 22h10"
        [attr.stroke]="detailColor()"
      />

      <!-- Candidate Information -->
      <path
        d="M8 9h8M8 13h4"
        [attr.stroke]="detailColor()"
      />

      <!-- Evaluation Check -->
      <path
        d="M16 12l2 2 3-3"
        [attr.stroke]="detailColor()"
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
export class CxpIconScreeningInterviews {

  readonly size =
    input<'xs' | 'sm' | 'md' | 'lg'>('md');

  readonly fill =
    input<'outline' | 'filled'>('outline');

  readonly strokeWidth = input<number>(1.5);

  readonly pixelSize = computed(() => ({
    xs: 14,
    sm: 18,
    md: 22,
    lg: 28,
  })[this.size()]);

  readonly detailColor = computed(() =>
    this.fill() === 'filled'
      ? 'var(--cxp-icon-detail-color, white)'
      : 'currentColor'
  );
}
