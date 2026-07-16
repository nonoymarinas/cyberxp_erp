import { Component, Input } from '@angular/core';

type IconFill = 'filled' | 'outline';

type IconSize =
  | 'xxs'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl';

@Component({
  selector: 'cxp-icon-home-nav',
  standalone: true,
  imports: [],
  templateUrl: './cxp-icon-home-nav.html',
  styleUrl: './cxp-icon-home-nav.css',
})
export class CxpIconHomeNav {
  @Input() fill: IconFill = 'filled';

  @Input() size: IconSize = 'sm';
}