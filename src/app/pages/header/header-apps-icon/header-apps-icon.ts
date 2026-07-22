import { Component } from '@angular/core';
import { CxpIconAppNav } from 'cyberxp-ui';
import{HeaderAppsMenu} from "../header-apps-menu/header-apps-menu"

@Component({
  selector: 'header-apps-icon',
  standalone: true,
  imports: [CxpIconAppNav,HeaderAppsMenu],
  templateUrl: './header-apps-icon.html',
  styleUrl: './header-apps-icon.css',
})
export class HeaderAppsIcon {
  isAppMenuOpen = false;
  toggleAppMenu(): void {
    this.isAppMenuOpen = !this.isAppMenuOpen;
  }
}
