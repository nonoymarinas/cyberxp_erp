import { Component, EventEmitter, Output } from '@angular/core';
import { CxpIconUserCircle, CxpButton } from 'cyberxp-ui';

@Component({
  selector: 'ams-security-view',
  standalone: true,
  imports: [CxpIconUserCircle, CxpButton],
  templateUrl: './security-view.html',
  styleUrl: './security-view.css',
})
export class AmsSecurityView {
  @Output() edit = new EventEmitter<void>();
}
