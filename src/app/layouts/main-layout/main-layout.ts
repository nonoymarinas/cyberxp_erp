import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IconBurgerMenu } from 'cyberxp-ui';


@Component({
  selector: 'app-main-layout',
  standalone:true,
  imports: [RouterOutlet,IconBurgerMenu],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {
}
