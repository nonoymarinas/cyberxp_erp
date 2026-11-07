import { Component, inject } from '@angular/core';

import {
  CxpLayoutMain,
  CxpIconAppNav,
  CxpIconHomeNav,
  CxpIconLogoutNav,
  CxpIconSettingsNav,
  CxpIconUserNav,
  CxpMenuSidebarItem,
  CxpIconChartNav,
} from 'cyberxp-ui';
import { HeaderAppsIcon } from './components/header-apps-icon/header-apps-icon';
import { HeaderUserIcon } from './components/header-user-icon/header-user-icon';
import { UserAccessService } from '../../core/authorization/services/user-access.services';
import { CxpChatbotMain } from '../../components/chatbot/cxp-chatbot-main/cxp-chatbot-main';

@Component({
  selector: 'main-layout',
  standalone: true,
  imports: [
    CxpLayoutMain,
    CxpIconAppNav,
    CxpIconHomeNav,
    CxpIconLogoutNav,
    CxpIconSettingsNav,
    CxpIconUserNav,
    CxpMenuSidebarItem,
    HeaderAppsIcon,
    HeaderUserIcon,
    CxpIconChartNav,
    CxpChatbotMain
  ],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {
  sidebarOpen = false;
  sidebarWidth = 260;

  public readonly userAccessService = inject(UserAccessService);
}
