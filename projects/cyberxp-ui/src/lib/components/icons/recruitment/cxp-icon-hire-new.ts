
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

@Component({
  selector: 'cxp-icon-hire-new',
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
      <!-- Employee Head -->
      <circle
        cx="9" cy="8" r="3"
        [attr.fill]="fill() === 'filled'
          ? 'currentColor'
          : 'none'"
      />

      <!-- Employee Body -->
      <path
        d="M3 20v-2a6 6 0 0 1 12 0v2"
      />

      <!-- New Employee Symbol -->
      <path
        d="M19 8v8M15 12h8"
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
export class CxpIconHireNew {

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
}
