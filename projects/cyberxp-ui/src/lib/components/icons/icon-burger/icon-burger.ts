// src/app/shared/components/icons/icon-burger/icon-burger.ts

import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-burger',
  standalone: true,
  imports: [],
  templateUrl: './icon-burger.html',
  styleUrl: './icon-burger.css',
})
export class IconBurger {
  @Input()
  theme: 'dark' | 'light' = 'dark';

  @Input()
  size: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
}