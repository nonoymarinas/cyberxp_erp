import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

import {CxpButtonLogin, CxpInputText, CxpIconCyberxpApp, CxpIconEyePassword } from 'cyberxp-ui';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, CxpButtonLogin, CxpInputText, CxpIconCyberxpApp, CxpIconEyePassword],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  passwordVisible = false;

  get passwordHidden(): boolean {
    return !this.passwordVisible;
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

 constructor(private router: Router) {}

  signIn() {

    // Later you will validate the username/password.

    this.router.navigate(['/app']);
  }
}
