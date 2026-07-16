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
  selector: 'cxp-icon-settings-nav',
  standalone: true,
  imports: [],
  templateUrl: './cxp-icon-settings-nav.html',
  styleUrl: './cxp-icon-settings-nav.css',
})
export class CxpIconSettingsNav {
  @Input() fill: IconFill = 'filled';

  @Input() size: IconSize = 'sm';
}