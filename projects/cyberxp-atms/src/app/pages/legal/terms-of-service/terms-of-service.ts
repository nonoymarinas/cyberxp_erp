import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CxpModal, CxpButton } from 'cyberxp-ui';

@Component({
  selector: 'ams-terms-of-service',
  standalone: true,
  imports: [CxpModal, CxpButton],
  templateUrl: './terms-of-service.html',
  styleUrl: './terms-of-service.css',
})
export class TermsOfService {
  isOpen = true;

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