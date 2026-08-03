import { Component } from '@angular/core';
import {
  CxpIconHrmsApp,
  CxpIconAppStatic,
  CxpIconTnmsApp,
  CxpIconAtmsApp,
} from 'cyberxp-ui';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
  imports: [
    CxpIconHrmsApp,
    CxpIconAppStatic,
    CxpIconTnmsApp,
    CxpIconAtmsApp,
  ],
})
export class HomePage {}
