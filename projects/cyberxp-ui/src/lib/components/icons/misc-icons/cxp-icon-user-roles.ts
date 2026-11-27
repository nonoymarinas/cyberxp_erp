import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'cxp-icon-user-roles',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg"
      [attr.width]="pixelSize()" [attr.height]="pixelSize()"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      [attr.stroke-width]="strokeWidth()"
      stroke-linecap="round" stroke-linejoin="round"
      aria-hidden="true" focusable="false">
      <circle cx="9" cy="7" r="3" [attr.fill]="bodyFill()"/><path d="M3 21v-3a6 6 0 0 1 12 0v3"/><path d="M18 10l4 2v4c0 2-2 4-4 5-2-1-4-3-4-5v-4z" [attr.fill]="bodyFill()"/>
      <path d="m16 15 1.5 1.5L20 14" [attr.stroke]="detailColor()"/>
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
export class CxpIconUserRoles {
  readonly size = input<'xs' | 'sm' | 'md' | 'lg'>('md');
  readonly fill = input<'outline' | 'filled'>('outline');
  readonly strokeWidth = input<number>(1.5);
  readonly pixelSize = computed(() => ({ xs: 14, sm: 18, md: 22, lg: 28 })[this.size()]);
  readonly bodyFill = computed(() => this.fill() === 'filled' ? 'currentColor' : 'none');
  readonly detailColor = computed(() => this.fill() === 'filled' ? 'var(--cxp-icon-detail-color, white)' : 'currentColor');
}
