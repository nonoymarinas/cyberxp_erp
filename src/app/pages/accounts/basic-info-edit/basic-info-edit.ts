import { Component, EventEmitter, Output } from '@angular/core';
import { CxpInputText } from 'cyberxp-ui';

@Component({
  selector: 'ams-basic-info-edit',
  standalone: true,
  imports: [CxpInputText],
  templateUrl: './basic-info-edit.html',
  styleUrl: './basic-info-edit.css',
})
export class AmsBasicInfoEdit {
  @Output() save = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
}