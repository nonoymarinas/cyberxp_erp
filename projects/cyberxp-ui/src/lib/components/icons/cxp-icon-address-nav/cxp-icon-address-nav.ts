import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'cxp-icon-address-nav',
  standalone: true,
  imports: [],
  templateUrl: './cxp-icon-address-nav.html',
  styleUrl: './cxp-icon-address-nav.css',
})
export class CxpIconAddressNav {
  @Input()
  fill: 'filled' | 'outline' = 'filled';

  @Input()
  size: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

  @Input()
  ariaLabel = 'Icon';

}
