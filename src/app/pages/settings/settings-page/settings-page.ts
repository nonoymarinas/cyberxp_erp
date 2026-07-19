import { Component, EventEmitter, Output } from '@angular/core';
import { CxpIconUserCircle, CxpButton, CxpIconSettingsNav, CxpIconThemeNav } from 'cyberxp-ui';

@Component({
  selector: 'ams-settings-page',
  standalone: true,
  imports: [CxpIconUserCircle, CxpButton, CxpIconSettingsNav, CxpIconThemeNav],
  templateUrl: './settings-page.html',
  styleUrl: './settings-page.css',
})
export class SettingsPage {
  @Output() edit = new EventEmitter<void>();
}
