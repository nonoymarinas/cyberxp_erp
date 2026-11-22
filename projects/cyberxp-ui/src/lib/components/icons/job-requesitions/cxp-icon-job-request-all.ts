
import { Component, input } from '@angular/core';

@Component({
  selector: 'cxp-icon-job-request-all',
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
      <path d="M16 2H6a2 2 0 0 0-2 2v12"/>
      <path d="M18 6H10a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2Z"/>
      <path d="M12 11h4"/>
      <path d="M12 15h4"/>
      <path d="M12 19h3"/>
    </svg>
  `,
  host: {
    'style': 'display:inline-flex;align-items:center;justify-content:center;flex-shrink:0',
  },
})
export class CxpIconJobRequestAll {
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
