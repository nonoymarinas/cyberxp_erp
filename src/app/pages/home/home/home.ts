import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  CxpIconUserCircle,
  CxpIconAppNav,
  CxpIconHrmsApp,
  CxpIconUserNav,
  CxpIconHomeNav,
  CxpIconAppStatic,
} from 'cyberxp-ui';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.css',
  imports: [
    CxpIconUserCircle,
    CxpIconAppNav,
    CxpIconHrmsApp,
    CxpIconUserNav,
    CxpIconHomeNav,
    CxpIconAppStatic,
  ],
})
export class HomePage {}
