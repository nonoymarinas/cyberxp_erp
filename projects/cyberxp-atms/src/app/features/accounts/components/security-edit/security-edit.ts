import { Component, EventEmitter, Output } from '@angular/core';
import { CxpIconUserCircle, CxpButton, CxpInputText } from 'cyberxp-ui';

@Component({
  selector: 'ams-security-edit',
  standalone: true,
  imports: [CxpIconUserCircle, CxpButton, CxpInputText],
  templateUrl: './security-edit.html',
  styleUrl: './security-edit.css',
})
export class AmsSecurityEdit {
  @Output() edit = new EventEmitter<void>();
}
