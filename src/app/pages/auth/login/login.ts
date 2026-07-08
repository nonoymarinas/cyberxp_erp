import { Component } from '@angular/core';
import{IconCyberxp} from '../../../shared/components/icons/icon-cyberxp/icon-cyberxp';
import { InputLogin } from "../../../shared/components/inputs/input-login/input-login";
import { ButtonLogin } from "../../../shared/components/buttons/button-login/button-login";


@Component({
  selector: 'app-login',
  imports: [IconCyberxp, InputLogin, ButtonLogin],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {}
