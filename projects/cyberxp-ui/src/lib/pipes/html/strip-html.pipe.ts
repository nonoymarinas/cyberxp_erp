import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpHtmlStripHtml',
  standalone: true,
  pure: true,
})
export class CxpHtmlStripHtmlPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    return (value ?? '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  }


}
