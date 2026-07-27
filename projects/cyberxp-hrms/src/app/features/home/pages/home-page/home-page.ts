import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  CxpIconUserCircle,
  CxpIconAppNav,
  CxpIconHrmsApp,
  CxpIconUserNav,
  CxpIconHomeNav,
  CxpIconAppStatic,
  CxpIconTnmsApp,
  CxpIconAtmsApp,
} from 'cyberxp-ui';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
  imports: [
    CxpIconUserCircle,
    CxpIconAppNav,
    CxpIconHrmsApp,
    CxpIconUserNav,
    CxpIconHomeNav,
    CxpIconAppStatic,
    CxpIconTnmsApp,
    CxpIconAtmsApp,
  ],
})
export class HomePage {}
