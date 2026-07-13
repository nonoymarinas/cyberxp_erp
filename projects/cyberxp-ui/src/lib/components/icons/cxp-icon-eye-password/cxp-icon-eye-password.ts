import {
  booleanAttribute,
  Component,
  Input,
} from '@angular/core';

@Component({
  selector: 'cxp-icon-eye-password',
  standalone: true,
  imports: [],
  templateUrl: './cxp-icon-eye-password.html',
  styleUrl: './cxp-icon-eye-password.css',
})
export class CxpIconEyePassword {
  @Input()
  theme: 'dark' | 'light' = 'dark';

  @Input()
  fill: 'filled' | 'outline' = 'filled';

  @Input()
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'sm';

  @Input({ transform: booleanAttribute })
  slashed = false;
}