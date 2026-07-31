import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpObjectJsonPretty',
  standalone: true,
  pure: true,
})
export class CxpObjectJsonPrettyPipe implements PipeTransform {
  transform(value: unknown, spaces = 2): string {
    try { return JSON.stringify(value, null, spaces); } catch { return ''; }
  }


}
