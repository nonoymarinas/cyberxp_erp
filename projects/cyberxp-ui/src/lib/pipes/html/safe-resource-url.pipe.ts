import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({ name: 'cxpHtmlSafeResourceUrl', standalone: true, pure: true })
export class CxpHtmlSafeResourceUrlPipe implements PipeTransform {
  constructor(private readonly sanitizer: DomSanitizer) {}

  transform(value: string | null | undefined): SafeResourceUrl | null {
    return value == null ? null : this.sanitizer.bypassSecurityTrustResourceUrl(value);
  }
}
