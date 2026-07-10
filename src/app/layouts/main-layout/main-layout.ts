import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IconBurgerMenu, IconAppMenu } from 'cyberxp-ui';


@Component({
  selector: 'app-main-layout',
  standalone:true,
  imports: [RouterOutlet,IconBurgerMenu,IconAppMenu],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {
}
