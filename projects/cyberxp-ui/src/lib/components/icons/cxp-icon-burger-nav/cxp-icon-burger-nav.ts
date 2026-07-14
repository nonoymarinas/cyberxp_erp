// src/app/shared/components/icons/icon-burger/icon-burger.ts

import { Component, Input } from '@angular/core';

@Component({
  selector: 'cxp-icon-burger-nav',
  standalone: true,
  imports: [],
  templateUrl: './cxp-icon-burger-nav.html',
  styleUrl: './cxp-icon-burger-nav.css',
})
export class CxpIconBurgerNav {
  @Input()
  theme: 'dark' | 'light' = 'dark';

  @Input()
  size: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

  @Input() IsIconActive = false;

}