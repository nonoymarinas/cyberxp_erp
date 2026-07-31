import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpFileFilename',
  standalone: true,
  pure: true,
})
export class CxpFileFilenamePipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    const text=value ?? ''; return text.split(/[\\/]/).pop() ?? '';
  }


}
