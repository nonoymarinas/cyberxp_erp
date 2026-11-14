
import { Component, inject } from '@angular/core';

// ========================================
// CyberXP UI Components
// ========================================

import {
  // Layout
  CxpLayoutMain,
  CxpMenuSidebarItem,

  // Header Icon
  CxpIconAppNav,

  // Main Menu Icons
  CxpIconMenuDashboard,
  CxpIconMenuHome,
  CxpIconMenuEmployees,
  CxpIconHumanPlus,
  CxpIconMenuRehire,
  CxpIconMenuReactivation,

  // Submenu Icons
  CxpIconMenuRecords,
  CxpIconHumanNew,
  CxpIconMenuHistory,
  CxpIconMenuPending,

  // Footer Icons
  CxpIconSettingsNav,
  CxpIconLogoutNav,
} from 'cyberxp-ui';

// ========================================
// Header Components
// ========================================

import {
  HeaderAppsIcon,
} from './components/header-apps-icon/header-apps-icon';

import {
  HeaderUserIcon,
} from './components/header-user-icon/header-user-icon';

// ========================================
// Authorization
// ========================================

import {
  UserAccessService,
} from '../../core/authorization/services/user-access.services';

// ========================================
// Chatbot
// ========================================

import {
  CxpChatbotMain,
} from '../../components/chatbot/cxp-chatbot-main/cxp-chatbot-main';

// ========================================
// Main Layout
// ========================================

@Component({
  selector: 'main-layout',
  standalone: true,

  imports: [
    // Layout
    CxpLayoutMain,
    CxpMenuSidebarItem,

    // Header
    CxpIconAppNav,
    HeaderAppsIcon,
    HeaderUserIcon,

    // Main Menu Icons
    CxpIconMenuDashboard,
    CxpIconMenuHome,
    CxpIconMenuEmployees,
    CxpIconHumanPlus,
    CxpIconMenuRehire,
    CxpIconMenuReactivation,

    // Submenu Icons
    CxpIconMenuRecords,
    CxpIconHumanNew,
    CxpIconMenuHistory,
    CxpIconMenuPending,

    // Footer Icons
    CxpIconSettingsNav,
    CxpIconLogoutNav,

    // Chatbot
    CxpChatbotMain,
  ],

  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {

  // ========================================
  // Sidebar State
  // ========================================

  sidebarOpen = false;

  sidebarWidth = 260;

  // ========================================
  // Authorization
  // ========================================

  public readonly userAccessService =
    inject(UserAccessService);
}
