import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeScript } from '@angular/platform-browser';

@Pipe({ name: 'cxpHtmlSafeScript', standalone: true, pure: true })
export class CxpHtmlSafeScriptPipe implements PipeTransform {
  constructor(private readonly sanitizer: DomSanitizer) {}

  transform(value: string | null | undefined): SafeScript | null {
    return value == null ? null : this.sanitizer.bypassSecurityTrustScript(value);
  }
}
