import { Component, Input } from '@angular/core';

@Component({
  selector: 'cxp-display-field',
  standalone: true,
  imports: [],
  templateUrl: './cxp-display-field.html',
  styleUrl: './cxp-display-field.css',
})
export class CxpDisplayField {
  @Input()
  value: string | number | null | undefined = '';

  @Input()
  size: 'sm' | 'md' | 'lg' | 'xl' = 'md';

  @Input()
  disabled = false;

  @Input()
  invalid = false;
}
