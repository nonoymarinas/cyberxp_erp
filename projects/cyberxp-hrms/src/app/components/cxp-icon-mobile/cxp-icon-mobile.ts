import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';

@Component({
  selector: 'cxp-icon-mobile',
  standalone: true,
  templateUrl: './cxp-icon-mobile.html',
  styleUrl: './cxp-icon-mobile.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CxpIconMobile {
  @Input() size: 'xs' | 'sm' | 'md' | 'lg' = 'sm';
}