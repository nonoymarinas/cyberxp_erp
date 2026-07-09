import { Component, Input } from '@angular/core';
import { ButtonLogin } from "../../../shared/components/buttons/button-login/button-login";
import{  IconCyberxpXl } from 'cyberxp-ui'

@Component({
  selector: 'app-login',
  imports: [ButtonLogin, IconCyberxpXl],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {}
