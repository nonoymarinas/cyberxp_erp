import { Component, Input } from '@angular/core';

type IconSize =
  | 'xxs'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl';

@Component({
  selector: 'cxp-icon-burger-nav',
  standalone: true,
  imports: [],
  templateUrl: './cxp-icon-burger-nav.html',
  styleUrl: './cxp-icon-burger-nav.css',
})
export class CxpIconBurgerNav {
  @Input() size: IconSize = 'md';

  @Input() isIconActive = false;
}