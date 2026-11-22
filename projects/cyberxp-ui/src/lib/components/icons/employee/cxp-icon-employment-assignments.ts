
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

@Component({
  selector: 'cxp-icon-employment-assignments',
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
      <path
        d="M8 8V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3"
      />

      <rect
        x="3" y="8"
        width="18" height="13"
        rx="2"
        [attr.fill]="fill() === 'filled'
          ? 'currentColor' : 'none'"
      />

      <path
        d="M3 14h18M12 12v4"
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
export class CxpIconEmploymentAssignments {
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
