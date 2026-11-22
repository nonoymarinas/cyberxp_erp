
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

@Component({
  selector: 'cxp-icon-employee-records',
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
      <rect
        x="4" y="3"
        width="16" height="18"
        rx="2"
        [attr.fill]="fill() === 'filled'
          ? 'currentColor' : 'none'"
      />

      <circle
        cx="10" cy="9" r="2"
        [attr.stroke]="detailColor()"
        fill="none"
      />

      <path
        d="M7 16a3 3 0 0 1 6 0M15 9h2M15 13h2"
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

    svg { display: block; }
  `],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CxpIconEmployeeRecords {
  readonly size = input<'xs' | 'sm' | 'md' | 'lg'>('md');
  readonly fill = input<'outline' | 'filled'>('outline');
  readonly strokeWidth = input<number>(1.5);

  readonly pixelSize = computed(() => ({
    xs: 14, sm: 18, md: 22, lg: 28,
  })[this.size()]);

  readonly detailColor = computed(() =>
    this.fill() === 'filled'
      ? 'var(--cxp-icon-detail-color, white)'
      : 'currentColor'
  );
}
