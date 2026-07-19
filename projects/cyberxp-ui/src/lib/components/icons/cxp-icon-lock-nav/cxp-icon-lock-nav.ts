import { Component, Input } from '@angular/core';

type IconFill = 'filled' | 'outline';

type IconSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'cxp-icon-lock-nav',
  standalone: true,
  imports: [],
  templateUrl: './cxp-icon-lock-nav.html',
  styleUrl: './cxp-icon-lock-nav.css',
})
export class CxpIconLockNav {
  @Input() fill: IconFill = 'filled';

  @Input() size: IconSize = 'sm';
}
