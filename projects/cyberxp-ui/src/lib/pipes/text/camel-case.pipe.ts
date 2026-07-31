import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpTextCamelCase',
  standalone: true,
  pure: true,
})
export class CxpTextCamelCasePipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    const words = this.words(value); return words.map((word, index) => index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)).join('');
  }


private words(value: string | null | undefined): string[] {
  return (value ?? '')
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .trim()
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
}

}
