import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({ name: 'cxpHtmlSafeHtml', standalone: true, pure: true })
export class CxpHtmlSafeHtmlPipe implements PipeTransform {
  constructor(private readonly sanitizer: DomSanitizer) {}

  transform(value: string | null | undefined): SafeHtml | null {
    return value == null ? null : this.sanitizer.bypassSecurityTrustHtml(value);
  }
}
