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
  selector: 'cxp-icon-user-nav',
  standalone: true,
  imports: [],
  templateUrl: './cxp-icon-user-nav.html',
  styleUrl: './cxp-icon-user-nav.css',
})
export class CxpIconUserNav {
  @Input() fill: IconFill = 'filled';

  @Input() size: IconSize = 'sm';
}