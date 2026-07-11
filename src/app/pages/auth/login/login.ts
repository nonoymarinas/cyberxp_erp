import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import {
  ButtonLogin,
  CxpInput,
  IconCyberxp,
  IconEye,
  IconPassword,
  IconUser,
} from 'cyberxp-ui';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    ButtonLogin,
    CxpInput,
    IconCyberxp,
    IconUser,
    IconPassword,
    IconEye,
  ],
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

  login(): void {
    console.log('Login clicked');
  }
}