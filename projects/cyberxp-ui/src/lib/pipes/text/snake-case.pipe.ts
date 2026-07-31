import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpTextSnakeCase',
  standalone: true,
  pure: true,
})
export class CxpTextSnakeCasePipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    return this.words(value).join('_');
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
