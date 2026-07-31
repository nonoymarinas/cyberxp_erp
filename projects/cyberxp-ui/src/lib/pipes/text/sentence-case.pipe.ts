import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpTextSentenceCase',
  standalone: true,
  pure: true,
})
export class CxpTextSentenceCasePipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    const text = (value ?? '').trim().toLowerCase(); return text ? text.charAt(0).toUpperCase() + text.slice(1) : '';
  }


}
