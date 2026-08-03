import { Component } from '@angular/core';

import {
  CxpLayoutMain,
  CxpIconCyberxpApp,
  CxpIconHomeNav,
  CxpIconLogoutNav,
  CxpIconSettingsNav,
  CxpIconUserNav,
  CxpMenuSidebarItem,
  CxpIconChartNav
} from 'cyberxp-ui';
import { HeaderAppsIcon } from "./components/header-apps-icon/header-apps-icon";
import { HeaderUserIcon } from "./components/header-user-icon/header-user-icon";

@Component({
  selector: 'main-layout',
  standalone: true,
  imports: [
    CxpLayoutMain,
    CxpIconCyberxpApp,
    CxpIconHomeNav,
    CxpIconLogoutNav,
    CxpIconSettingsNav,
    CxpIconUserNav,
    CxpMenuSidebarItem,
    HeaderAppsIcon,
    HeaderUserIcon,
    CxpIconChartNav,
],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {
  sidebarOpen = false;
  sidebarWidth = 260;
}