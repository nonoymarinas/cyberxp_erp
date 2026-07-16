import { Component, Input } from '@angular/core';

type IconFill = 'filled' | 'outline';

type IconSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'| '4xl'| '5xl'| '6xl';

@Component({
  selector: 'cxp-icon-user-circle',
  standalone: true,
  imports: [],
  templateUrl: './cxp-icon-user-circle.html',
  styleUrl: './cxp-icon-user-circle.css',
})
export class CxpIconUserCircle {
  @Input() fill: IconFill = 'filled';

  @Input() size: IconSize = 'sm';

  @Input() image = '';

  @Input() imageAlt = 'User profile';
}
