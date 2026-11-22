
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

@Component({
  selector: 'cxp-icon-job-openings',
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
      <!-- Briefcase Handle -->
      <path
        d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
      />

      <!-- Briefcase Body -->
      <rect
        x="3"
        y="7"
        width="18"
        height="14"
        rx="2"
        [attr.fill]="fill() === 'filled'
          ? 'currentColor'
          : 'none'"
      />

      <!-- Briefcase Divider -->
      <path
        d="M3 13h18"
        [attr.stroke]="fill() === 'filled'
          ? 'var(--cxp-icon-detail-color, white)'
          : 'currentColor'"
      />

      <!-- Center Lock -->
      <path
        d="M10 12v3h4v-3"
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
export class CxpIconJobOpenings {

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
