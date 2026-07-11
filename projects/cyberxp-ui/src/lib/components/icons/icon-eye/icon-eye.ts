import {
  booleanAttribute,
  Component,
  Input,
} from '@angular/core';

@Component({
  selector: 'icon-eye',
  standalone: true,
  imports: [],
  templateUrl: './icon-eye.html',
  styleUrl: './icon-eye.css',
})
export class IconEye {
  @Input()
  theme: 'dark' | 'light' = 'dark';

  @Input()
  fill: 'filled' | 'outline' = 'filled';

  @Input()
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'sm';

  @Input({ transform: booleanAttribute })
  slashed = false;
}