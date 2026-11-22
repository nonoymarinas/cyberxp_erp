import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'cxp-icon-document-requirements',
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
      <path d="M5 3h10l5 5v13H5zM15 3v5h5M8 13h8M8 17h5"/>
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
export class CxpIconDocumentRequirements {
  readonly size = input<'xs' | 'sm' | 'md' | 'lg'>('md');
  readonly fill = input<'outline' | 'filled'>('outline');
  readonly strokeWidth = input<number>(1.5);
  readonly pixelSize = computed(() => ({
    xs: 14,
    sm: 18,
    md: 22,
    lg: 28,
  })[this.size()]);
}
