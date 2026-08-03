import { Component } from '@angular/core';

import {
  CxpMenuSidebarItem,
  CxpIconLogoutNav,
  CxpModalMenu,
  CxpButton,
  CxpIconUserCircle,
  CxpIconSettingsNav,
} from 'cyberxp-ui';

@Component({
  selector: 'header-user-icon',
  standalone: true,
  imports: [
    CxpMenuSidebarItem,
    CxpIconLogoutNav,
    CxpModalMenu,
    CxpButton,
    CxpIconUserCircle,
    CxpIconSettingsNav,
  ],
  templateUrl: './header-user-icon.html',
  styleUrl: './header-user-icon.css',
})
export class HeaderUserIcon {
  isAppMenuOpen = false;

  toggleAppMenu(event: MouseEvent): void {
    const target = event.target;

    if (!(target instanceof Element)) {
      return;
    }

    if (!target.closest('cxp-icon-user-circle')) {
      return;
    }

    this.isAppMenuOpen = !this.isAppMenuOpen;
  }

  closeAppMenu(): void {
    this.isAppMenuOpen = false;
  }
}
