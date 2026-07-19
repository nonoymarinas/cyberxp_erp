import { Component } from '@angular/core';
import { AmsBasicInfoView as BasicInfoView } from '../basic-info-view/basic-info-view';
import { AmsSecurityView as SecurityView } from '../security-view/security-view';
import { AmsSecurityEdit as SecurityEdit } from '../security-edit/security-edit';
import { CxpIconUserCircle, CxpButton, CxpIconUserNav, CxpIconLockNav } from 'cyberxp-ui';

type AccountEditingSection = 'basic-info' | 'security' | null;

@Component({
  selector: 'ams-account-page',
  standalone: true,
  imports: [
    BasicInfoView,
    SecurityView,
    SecurityEdit,
    CxpIconUserCircle,
    CxpButton,
    CxpIconUserNav,
    CxpIconLockNav,
  ],
  templateUrl: './account-page.html',
  styleUrl: './account-page.css',
})
export class AccountPage {
  editingSection: AccountEditingSection = null;

  editSecurity(): void {
    this.editingSection = 'security';
  }

  saveSecurity(): void {
    // TODO: Validate and save security information

    this.editingSection = null;
  }

  cancelSecurity(): void {
    this.editingSection = null;
  }

  // toggleTheme(): void {
  //   const isDarkTheme = document.body.classList.contains('theme-dark');

  //   document.body.classList.toggle('theme-dark', !isDarkTheme);
  //   document.body.classList.toggle('theme-light', isDarkTheme);
  // }
}
