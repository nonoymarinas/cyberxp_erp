import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'cxp-icon-chart-nav',
  standalone: true,
  imports: [],
  templateUrl: './cxp-icon-chart-nav.html',
  styleUrl: './cxp-icon-chart-nav.css',
})
export class CxpIconChartNav {
  @Input()
  fill: 'filled' | 'outline' = 'filled';

  @Input()
  size: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

  @Input()
  ariaLabel = 'Icon';

}
