import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { CxpButtonLogin, CxpInputText, CxpIconCyberxpApp, CxpIconEyePassword } from 'cyberxp-ui';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, CxpButtonLogin, CxpInputText, CxpIconCyberxpApp, CxpIconEyePassword, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  readonly fb = inject(FormBuilder);
  readonly isSaving = signal(false);
  passwordVisible = false;

  form: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  get passwordHidden(): boolean {
    return !this.passwordVisible;
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  constructor(private router: Router) { }

  signIn() {

    console.log('payload:', this.form.getRawValue());

    // this.isSaving.set(true);
  }
}
