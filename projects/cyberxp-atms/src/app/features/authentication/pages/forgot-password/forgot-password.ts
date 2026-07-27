import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CxpModal, CxpButton, CxpInputText, CxpIconLockNav } from 'cyberxp-ui';

@Component({
  selector: 'forgot-password',
  standalone: true,
  imports: [CxpModal, CxpButton, CxpInputText,CxpIconLockNav],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css',
})
export class ForgotPassword {
  isOpen = true;
  constructor(private router: Router) {}

  close(): void {
    this.isOpen = false;
    this.router.navigate(['/']);
  }

  submit(): void {
    // Save acceptance if needed

    this.router.navigate(['/']);
  }
}
