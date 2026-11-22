import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'cxp-icon-compensation',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg"
      [attr.width]="pixelSize()" [attr.height]="pixelSize()"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      [attr.stroke-width]="strokeWidth()"
      stroke-linecap="round" stroke-linejoin="round"
      aria-hidden="true" focusable="false">
      <rect x="3" y="6" width="18" height="15" rx="2"/><path d="M3 11h18M8 16h4M8 3h8"/>
    </svg>
  `,
  styles: [`
    :host { display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; line-height: 0; vertical-align: middle; }
    svg { display: block; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CxpIconCompensation {
  readonly size = input<'xs' | 'sm' | 'md' | 'lg'>('md');
  readonly fill = input<'outline' | 'filled'>('outline');
  readonly strokeWidth = input<number>(1.5);
  readonly pixelSize = computed(() => ({ xs: 14, sm: 18, md: 22, lg: 28 })[this.size()]);
}
