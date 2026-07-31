import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpFileMimeType',
  standalone: true,
  pure: true,
})
export class CxpFileMimeTypePipe implements PipeTransform {
  transform(value: string | null | undefined, types: Record<string, string> = { pdf:'application/pdf', png:'image/png', jpg:'image/jpeg', jpeg:'image/jpeg', gif:'image/gif', svg:'image/svg+xml', txt:'text/plain', csv:'text/csv', json:'application/json', zip:'application/zip', doc:'application/msword', docx:'application/vnd.openxmlformats-officedocument.wordprocessingml.document', xls:'application/vnd.ms-excel', xlsx:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }): string {
    const ext=(value ?? '').split('.').pop()?.toLowerCase() ?? ''; return types[ext] ?? 'application/octet-stream';
  }


}
