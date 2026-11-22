import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'cxp-icon-overtime',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg"
      [attr.width]="pixelSize()" [attr.height]="pixelSize()"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      [attr.stroke-width]="strokeWidth()"
      stroke-linecap="round" stroke-linejoin="round"
      aria-hidden="true" focusable="false">
      <circle cx="11" cy="12" r="8"/><path d="M11 7v5l4 2M19 3v6M16 6h6"/>
    </svg>
  `,
  styles: [`
    :host { display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; line-height: 0; vertical-align: middle; }
    svg { display: block; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CxpIconOvertime {
  readonly size = input<'xs' | 'sm' | 'md' | 'lg'>('md');
  readonly fill = input<'outline' | 'filled'>('outline');
  readonly strokeWidth = input<number>(1.5);
  readonly pixelSize = computed(() => ({ xs: 14, sm: 18, md: 22, lg: 28 })[this.size()]);
}
