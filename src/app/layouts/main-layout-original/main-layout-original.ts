import { Component } from '@angular/core';
import {
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';

import {
  CxpIconAppNav,
  CxpIconBurgerNav,
  CxpIconCyberxpApp,
  CxpIconHomeNav,
  CxpIconLogoutNav,
  CxpIconSettingsNav,
  CxpIconUserCircle,
  CxpIconUserNav,
  CxpMenuSidebarItem
} from 'cyberxp-ui';

@Component({
  selector: 'app-main-layout-original',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    CxpIconAppNav,
    CxpIconBurgerNav,
    CxpIconCyberxpApp,
    CxpIconHomeNav,
    CxpIconLogoutNav,
    CxpIconSettingsNav,
    CxpIconUserCircle,
    CxpIconUserNav,
    CxpMenuSidebarItem,
  ],
  templateUrl: './main-layout-original.html',
  styleUrl: './main-layout-original.css',
})
export class MainLayoutOriginal {
  sidebarOpen = false;

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebar(): void {
    this.sidebarOpen = false;
  }

  logout(): void {
    this.closeSidebar();

    // Add your logout logic here.
    // Example:
    // this.authService.logout();
    // this.router.navigate(['/']);
  }
}