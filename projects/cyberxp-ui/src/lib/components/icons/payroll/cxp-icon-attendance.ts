import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'cxp-icon-attendance',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg"
      [attr.width]="pixelSize()" [attr.height]="pixelSize()"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      [attr.stroke-width]="strokeWidth()"
      stroke-linecap="round" stroke-linejoin="round"
      aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2M7 17l2 2 4-4"/>
    </svg>
  `,
  styles: [`
    :host { display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; line-height: 0; vertical-align: middle; }
    svg { display: block; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CxpIconAttendance {
  readonly size = input<'xs' | 'sm' | 'md' | 'lg'>('md');
  readonly fill = input<'outline' | 'filled'>('outline');
  readonly strokeWidth = input<number>(1.5);
  readonly pixelSize = computed(() => ({ xs: 14, sm: 18, md: 22, lg: 28 })[this.size()]);
}
