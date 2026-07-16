import { Component } from '@angular/core';
import { AmsBasicInfoView } from '../basic-info-view/basic-info-view';
import { AmsBasicInfoEdit } from '../basic-info-edit/basic-info-edit';

@Component({
  selector: 'ams-account-page',
  standalone: true,
  imports: [
    AmsBasicInfoView,
    AmsBasicInfoEdit
  ],
  templateUrl: './account-page.html',
  styleUrl: './account-page.css',
})
export class AccountPage {

  isEditingBasicInfo = false;

  editBasicInfo(): void {
    this.isEditingBasicInfo = true;
  }

  saveBasicInfo(): void {

    // TODO: Save changes

    this.isEditingBasicInfo = false;
  }

  cancelBasicInfo(): void {
    this.isEditingBasicInfo = false;
  }

  toggleTheme(): void {

    if (document.body.classList.contains('theme-dark')) {

      document.body.classList.remove('theme-dark');
      document.body.classList.add('theme-light');

    } else {

      document.body.classList.remove('theme-light');
      document.body.classList.add('theme-dark');

    }

  }

}