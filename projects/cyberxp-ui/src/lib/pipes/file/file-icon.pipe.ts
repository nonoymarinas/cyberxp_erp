import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxpFileFileIcon',
  standalone: true,
  pure: true,
})
export class CxpFileFileIconPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    const ext=(value ?? '').split('.').pop()?.toLowerCase() ?? ''; const icons: Record<string,string>={pdf:'picture_as_pdf',doc:'description',docx:'description',xls:'table_chart',xlsx:'table_chart',png:'image',jpg:'image',jpeg:'image',gif:'image',zip:'folder_zip',txt:'article'}; return icons[ext] ?? 'insert_drive_file';
  }


}
