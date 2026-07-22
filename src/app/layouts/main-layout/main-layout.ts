import { Component } from '@angular/core';

import {
  CxpLayoutMain,
  CxpIconCyberxpApp,
  CxpIconAppNav,
  CxpIconUserCircle,
  CxpIconBurgerNav,
  CxpIconHomeNav,
  CxpIconLogoutNav,
  CxpIconSettingsNav,
  CxpIconUserNav,
  CxpMenuSidebarItem
} from 'cyberxp-ui';
import { HeaderAppsIcon } from "../../pages/header/header-apps-icon/header-apps-icon";

@Component({
  selector: 'main-layout',
  standalone: true,
  imports: [
    CxpLayoutMain,
    CxpIconCyberxpApp,
    CxpIconAppNav,
    CxpIconUserCircle,
    CxpIconBurgerNav,
    CxpIconHomeNav,
    CxpIconLogoutNav,
    CxpIconSettingsNav,
    CxpIconUserNav,
    CxpMenuSidebarItem,
    HeaderAppsIcon
],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {
  sidebarOpen = false;
  sidebarWidth = 260;
}