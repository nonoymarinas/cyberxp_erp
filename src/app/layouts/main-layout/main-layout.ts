import { Component } from '@angular/core';
import {  RouterLink,
  RouterLinkActive,
  RouterOutlet } from '@angular/router';
import { IconBurger, IconApp, IconSettings,IconHome,IconAccounts,IconCyberxp,IconUserCircle } from 'cyberxp-ui';


@Component({
  selector: 'app-main-layout',
  standalone:true,
  imports: [RouterOutlet,RouterLink,
  RouterLinkActive,IconBurger,IconApp, IconSettings,IconHome,IconAccounts,IconCyberxp,IconUserCircle],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {
}
