import { Component, Input } from '@angular/core';
import{  IconCyberxpXl,InputAutLg,InputAutMd,InputAutSm, ButtonAutMd} from 'cyberxp-ui'

@Component({
  selector: 'app-login',
  imports: [IconCyberxpXl, InputAutLg, InputAutSm, InputAutMd, ButtonAutMd],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {}
