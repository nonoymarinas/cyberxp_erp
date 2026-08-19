import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';

@Component({
  selector: 'cxp-icon-email',
  standalone: true,
  templateUrl: './cxp-icon-email.html',
  styleUrl: './cxp-icon-email.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CxpIconEmail {
  @Input() size: 'xs' | 'sm' | 'md' | 'lg' = 'sm';
}