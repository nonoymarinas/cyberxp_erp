import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'cxp-icon-roles',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg"
      [attr.width]="pixelSize()" [attr.height]="pixelSize()"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      [attr.stroke-width]="strokeWidth()"
      stroke-linecap="round" stroke-linejoin="round"
      aria-hidden="true" focusable="false">
      <path d="M12 2l9 4v6c0 5-4 8-9 10-5-2-9-5-9-10V6z" [attr.fill]="bodyFill()"/>
      <circle cx="12" cy="9" r="2.5" [attr.stroke]="detailColor()"/><path d="M7.5 16a4.5 4.5 0 0 1 9 0" [attr.stroke]="detailColor()"/>
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
export class CxpIconRoles {
  readonly size = input<'xs' | 'sm' | 'md' | 'lg'>('md');
  readonly fill = input<'outline' | 'filled'>('outline');
  readonly strokeWidth = input<number>(1.5);
  readonly pixelSize = computed(() => ({ xs: 14, sm: 18, md: 22, lg: 28 })[this.size()]);
  readonly bodyFill = computed(() => this.fill() === 'filled' ? 'currentColor' : 'none');
  readonly detailColor = computed(() => this.fill() === 'filled' ? 'var(--cxp-icon-detail-color, white)' : 'currentColor');
}
