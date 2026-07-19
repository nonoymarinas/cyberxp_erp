import { Component, Input } from '@angular/core';

@Component({
  selector: 'cxp-icon-app-static',
  standalone: true,
  imports: [],
  templateUrl: './cxp-icon-app-static.html',
  styleUrl: './cxp-icon-app-static.css',
})
export class CxpIconAppStatic {
  @Input()
  fill: 'filled' | 'outline' = 'filled';

  @Input()
  size: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
}
