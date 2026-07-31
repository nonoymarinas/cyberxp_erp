import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Pipe({ name: 'cxpHtmlSafeUrl', standalone: true, pure: true })
export class CxpHtmlSafeUrlPipe implements PipeTransform {
  constructor(private readonly sanitizer: DomSanitizer) {}

  transform(value: string | null | undefined): SafeUrl | null {
    return value == null ? null : this.sanitizer.bypassSecurityTrustUrl(value);
  }
}
