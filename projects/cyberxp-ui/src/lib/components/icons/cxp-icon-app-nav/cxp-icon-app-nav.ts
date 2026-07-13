import { Component, Input } from '@angular/core';

@Component({
  selector: 'cxp-icon-app-nav',
  standalone: true,
  imports: [],
  templateUrl: './cxp-icon-app-nav.html',
  styleUrl: './cxp-icon-app-nav.css',
})
export class CxpIconAppNav {
  @Input()
  theme: 'dark' | 'light' = 'dark';

  @Input()
  fill: 'filled' | 'outline' = 'filled';

  @Input()
  size: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
}