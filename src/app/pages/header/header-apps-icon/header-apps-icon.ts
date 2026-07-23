import { Component } from '@angular/core';

import { CxpIconAppNav, CxpModalMenu, CxpIconAtmsApp, CxpIconTnmsApp, CxpIconHrmsApp, CxpButton } from 'cyberxp-ui';

@Component({
  selector: 'header-apps-icon',
  standalone: true,
  imports: [CxpIconAppNav, CxpModalMenu, CxpIconAtmsApp, CxpIconTnmsApp, CxpIconHrmsApp, CxpButton],
  templateUrl: './header-apps-icon.html',
  styleUrl: './header-apps-icon.css',
})
export class HeaderAppsIcon {
  isAppMenuOpen = false;

  toggleAppMenu(event: MouseEvent): void {
    const target = event.target;

    if (!(target instanceof Element)) {
      return;
    }

    if (!target.closest('cxp-icon-app-nav')) {
      return;
    }

    this.isAppMenuOpen = !this.isAppMenuOpen;
  }

  closeAppMenu(): void {
    this.isAppMenuOpen = false;
  }
}
