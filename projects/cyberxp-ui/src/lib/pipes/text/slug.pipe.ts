import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpTextSlug',
  standalone: true,
  pure: true,
})
export class CxpTextSlugPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    return (value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  }


}
