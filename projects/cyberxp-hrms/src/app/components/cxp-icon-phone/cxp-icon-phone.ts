import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';

@Component({
  selector: 'cxp-icon-phone',
  standalone: true,
  templateUrl: './cxp-icon-phone.html',
  styleUrl: './cxp-icon-phone.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CxpIconPhone {
  @Input() size: 'xs' | 'sm' | 'md' | 'lg' = 'sm';
}