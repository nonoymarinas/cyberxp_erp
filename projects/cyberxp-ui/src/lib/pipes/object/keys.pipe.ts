import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpObjectKeys',
  standalone: true,
  pure: true,
})
export class CxpObjectKeysPipe implements PipeTransform {
  transform(value: Record<string, unknown> | null | undefined): string[] {
    return value ? Object.keys(value) : [];
  }


}
