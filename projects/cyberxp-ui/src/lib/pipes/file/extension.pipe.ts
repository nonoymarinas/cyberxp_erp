import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpFileExtension',
  standalone: true,
  pure: true,
})
export class CxpFileExtensionPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    const name = value ?? ''; const index = name.lastIndexOf('.'); return index > -1 ? name.slice(index + 1).toLowerCase() : '';
  }


}
