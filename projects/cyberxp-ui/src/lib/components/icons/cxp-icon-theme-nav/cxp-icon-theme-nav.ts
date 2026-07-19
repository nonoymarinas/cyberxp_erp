import { Component, Input } from '@angular/core';

type IconFill = 'filled' | 'outline';

type IconSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';

@Component({
  selector: 'cxp-icon-theme-nav',
  standalone: true,
  imports: [],
  templateUrl: './cxp-icon-theme-nav.html',
  styleUrl: './cxp-icon-theme-nav.css',
})
export class CxpIconThemeNav {
  @Input() fill: IconFill = 'filled';

  @Input() size: IconSize = 'sm';
}
