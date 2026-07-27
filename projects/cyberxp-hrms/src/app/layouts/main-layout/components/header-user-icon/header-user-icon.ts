import { Component } from '@angular/core';

import { CxpIconAppNav,CxpMenuSidebarItem,CxpIconLogoutNav, CxpModalMenu, CxpIconAtmsApp, CxpIconTnmsApp, CxpIconHrmsApp, CxpButton, CxpIconUserCircle, CxpIconSettingsNav } from 'cyberxp-ui';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'header-user-icon',
  standalone: true,
  imports: [CxpIconAppNav,CxpMenuSidebarItem, CxpIconLogoutNav, CxpModalMenu, CxpIconAtmsApp, CxpIconTnmsApp, CxpIconHrmsApp, CxpButton, CxpIconUserCircle, CxpIconSettingsNav, RouterLink],
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
