import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'cxp-icon-benefits-deductions',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg"
      [attr.width]="pixelSize()" [attr.height]="pixelSize()"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      [attr.stroke-width]="strokeWidth()"
      stroke-linecap="round" stroke-linejoin="round"
      aria-hidden="true" focusable="false">
      <path d="M12 21s-8-4.5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 6.5-8 11-8 11z"/><path d="M8 13h8M12 9v8"/>
    </svg>
  `,
  styles: [`
    :host { display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; line-height: 0; vertical-align: middle; }
    svg { display: block; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CxpIconBenefitsDeductions {
  readonly size = input<'xs' | 'sm' | 'md' | 'lg'>('md');
  readonly fill = input<'outline' | 'filled'>('outline');
  readonly strokeWidth = input<number>(1.5);
  readonly pixelSize = computed(() => ({ xs: 14, sm: 18, md: 22, lg: 28 })[this.size()]);
}
