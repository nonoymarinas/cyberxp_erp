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
  selector: 'cxp-icon-logout-nav',
  standalone: true,
  imports: [],
  templateUrl: './cxp-icon-logout-nav.html',
  styleUrl: './cxp-icon-logout-nav.css',
})
export class CxpIconLogoutNav {
  @Input() fill: IconFill = 'outline';

  @Input() size: IconSize = 'sm';
}