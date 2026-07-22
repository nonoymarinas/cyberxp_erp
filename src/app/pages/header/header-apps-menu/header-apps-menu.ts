import { Component, Input } from '@angular/core';
import { CxpIconAppNav } from 'cyberxp-ui';

@Component({
  selector: 'header-apps-menu',
  standalone: true,
  imports: [CxpIconAppNav],
  templateUrl: './header-apps-menu.html',
  styleUrl: './header-apps-menu.css',
})
export class HeaderAppsMenu {
  @Input()
  isOpen = false;
}