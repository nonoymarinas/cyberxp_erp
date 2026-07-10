import { Component } from '@angular/core';
import { Router } from '@angular/router';
import{  IconCyberxpXl,InputAutMd, ButtonAutMd} from 'cyberxp-ui'

@Component({
  selector: 'app-login',
  imports: [IconCyberxpXl, InputAutMd, ButtonAutMd],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  constructor(private router: Router) {}

  login(): void {
    // TODO: Validate credentials first

    this.router.navigate(['/app']);
  }
}
