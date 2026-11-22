
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

@Component({
  selector: 'cxp-icon-job-requisitions',
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
        x="5" y="4"
        width="14" height="17"
        rx="2"
        [attr.fill]="fill() === 'filled'
          ? 'currentColor'
          : 'none'"
      />

      <!-- Clipboard Clip -->
      <path
        d="M9 4.5V3h6v1.5"
        [attr.stroke]="detailColor()"
      />

      <!-- Requisition Lines -->
      <path
        d="M9 10h6M9 14h6M9 18h3"
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
export class CxpIconJobRequisitions {

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
