import { Component } from '@angular/core';
import{IconCyberxp} from '../../../shared/components/icons/icon-cyberxp/icon-cyberxp';
import { Input } from "../../../shared/components/inputs/input";


@Component({
  selector: 'app-login',
  imports: [IconCyberxp, Input],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {}
