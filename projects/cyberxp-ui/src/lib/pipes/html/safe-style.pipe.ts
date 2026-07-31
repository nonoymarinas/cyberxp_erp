import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Pipe({ name: 'cxpHtmlSafeStyle', standalone: true, pure: true })
export class CxpHtmlSafeStylePipe implements PipeTransform {
  constructor(private readonly sanitizer: DomSanitizer) {}

  transform(value: string | null | undefined): SafeStyle | null {
    return value == null ? null : this.sanitizer.bypassSecurityTrustStyle(value);
  }
}
