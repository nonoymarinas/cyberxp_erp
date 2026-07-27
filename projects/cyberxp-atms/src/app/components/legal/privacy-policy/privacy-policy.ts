import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CxpModal, CxpButton } from 'cyberxp-ui';

@Component({
  selector: 'atms-privacy-policy',
  standalone: true,
  imports: [CxpModal, CxpButton],
  templateUrl: './privacy-policy.html',
  styleUrl: './privacy-policy.css',
})
export class PrivacyPolicy {
  isOpen = true;
currentYear="2026"
  constructor(private router: Router) {}

  close(): void {
    this.isOpen = false;
    this.router.navigate(['/']);
  }

  accept(): void {
    // Save acceptance if needed

    this.router.navigate(['/']);
  }
}