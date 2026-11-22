
import { Component, input } from '@angular/core';

@Component({
  selector: 'cxp-icon-job-request-mine',
  standalone: true,
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      [attr.width]="iconSize()"
      [attr.height]="iconSize()"
      [attr.fill]="fill() === 'filled' ? 'currentColor' : 'none'"
      stroke="currentColor"
      [attr.stroke-width]="strokeWidth()"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      style="display:block"
    >
      <rect x="5" y="4" width="14" height="18" rx="2"/>
      <rect x="9" y="2" width="6" height="4" rx="1"/>
      <path d="M9 11h6"/>
      <path d="M9 15h4"/>
      <path d="m14 19 1.5 1.5L18 18"/>
    </svg>
  `,
  host: {
    'style': 'display:inline-flex;align-items:center;justify-content:center;flex-shrink:0',
  },
})
export class CxpIconJobRequestMine {
  readonly size = input<'xs' | 'sm' | 'md' | 'lg'>('md');
  readonly fill = input<'outline' | 'filled'>('outline');
  readonly strokeWidth = input<number>(1.5);

  readonly iconSize = () => ({
    xs: 16,
    sm: 20,
    md: 24,
    lg: 32,
  })[this.size()];
}
