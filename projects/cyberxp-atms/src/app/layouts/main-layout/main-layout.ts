import { Component } from '@angular/core';

// ========================================
// CyberXP UI Components
// ========================================

import {
  // Layout
  CxpLayoutMain,
  CxpMenuSidebarItem,

  // Header Icons
  CxpIconAppNav,

  // Personal Navigation Icons
  CxpIconHome,
  CxpIconMyApplications,
  CxpIconMyAccount,
  CxpIconMySecurity,

  // Administrative Main Menu Icons
  CxpIconAccounts,
  CxpIconAuthentication,
  CxpIconAuthorization,
  CxpIconAccessManagement,
  CxpIconApplications,
  CxpIconAuditLogs,
  CxpIconPlatformAdministration,

  // Accounts Submenu Icons
  CxpIconUserAccounts,
  CxpIconCreateAccount,
  CxpIconAccountHistory,

  // Authentication Submenu Icons
  CxpIconActiveSessions,
  CxpIconAuthenticationLogs,
  CxpIconMfaManagement,

  // Authorization Submenu Icons
  CxpIconRoles,
  CxpIconPermissions,
  CxpIconUserRoles,

  // Access Management Submenu Icons
  CxpIconApplicationAccess,
  CxpIconCompanyAccess,
  CxpIconEffectiveAccess,

  // Applications Submenu Icons
  CxpIconApplicationRegistry,
  CxpIconApplicationModules,

  // Audit Logs Submenu Icons
  CxpIconAdministrativeLogs,
  CxpIconSecurityEvents,

  // Platform Administration Submenu Icons
  CxpIconAdministrators,
  CxpIconSecurityPolicies,
  CxpIconPlatformConfiguration,

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
// Main Layout Component
// ========================================

@Component({
  selector: 'app-main-layout',

  standalone: true,

  imports: [
    // Layout
    CxpLayoutMain,
    CxpMenuSidebarItem,

    // Header
    CxpIconAppNav,
    HeaderAppsIcon,
    HeaderUserIcon,

    // Personal Navigation
    CxpIconHome,
    CxpIconMyApplications,
    CxpIconMyAccount,
    CxpIconMySecurity,

    // Administrative Main Menu
    CxpIconAccounts,
    CxpIconAuthentication,
    CxpIconAuthorization,
    CxpIconAccessManagement,
    CxpIconApplications,
    CxpIconAuditLogs,
    CxpIconPlatformAdministration,

    // Accounts
    CxpIconUserAccounts,
    CxpIconCreateAccount,
    CxpIconAccountHistory,

    // Authentication
    CxpIconActiveSessions,
    CxpIconAuthenticationLogs,
    CxpIconMfaManagement,

    // Authorization
    CxpIconRoles,
    CxpIconPermissions,
    CxpIconUserRoles,

    // Access Management
    CxpIconApplicationAccess,
    CxpIconCompanyAccess,
    CxpIconEffectiveAccess,

    // Applications
    CxpIconApplicationRegistry,
    CxpIconApplicationModules,

    // Audit Logs
    CxpIconAdministrativeLogs,
    CxpIconSecurityEvents,

    // Platform Administration
    CxpIconAdministrators,
    CxpIconSecurityPolicies,
    CxpIconPlatformConfiguration,

    // Footer
    CxpIconSettingsNav,
    CxpIconLogoutNav,
  ],

  templateUrl: './main-layout.html',

  styleUrl: './main-layout.css',
})
export class MainLayout {

  // ======================================
  // Sidebar Configuration
  // ======================================

  sidebarOpen = false;

  sidebarWidth = 260;

}