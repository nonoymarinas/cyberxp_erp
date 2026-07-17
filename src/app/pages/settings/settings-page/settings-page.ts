import { Component, EventEmitter, Output } from '@angular/core';
import { CxpIconUserCircle,CxpButton } from "cyberxp-ui";

@Component({
  selector: 'ams-settings-page',
  standalone: true,
  imports: [CxpIconUserCircle,CxpButton],
  templateUrl: './settings-page.html',
  styleUrl: './settings-page.css',
})
export class AmsSettingsPage {
  @Output() edit = new EventEmitter<void>();

}