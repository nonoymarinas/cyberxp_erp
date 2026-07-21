import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet, Router } from '@angular/router';
import {
  CxpIconBurgerNav,
  CxpIconCyberxpApp,
  CxpIconAppNav,
  CxpIconSettingsNav,
  CxpIconHomeNav,
  CxpIconUserNav,
  CxpIconUserCircle,
  CxpIconLogoutNav,
} from 'cyberxp-ui';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    CxpIconBurgerNav,
    CxpIconCyberxpApp,
    CxpIconAppNav,
    CxpIconSettingsNav,
    CxpIconHomeNav,
    CxpIconUserNav,
    CxpIconUserCircle,
    CxpIconLogoutNav,
  ],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {
  constructor(private router: Router) {}
  sidebarOpen = false;

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebar(): void {
    this.sidebarOpen = false;
  }

  openHome(): void {
    this.router.navigate(['/app/home']);
  }
  openAccounts(): void {
    this.router.navigate(['/app/accounts']);
  }
  openSettings(): void {
    this.router.navigate(['/app/settings']);
  }
}
