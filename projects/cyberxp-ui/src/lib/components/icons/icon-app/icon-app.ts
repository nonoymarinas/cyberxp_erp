import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-app',
  standalone: true,
  imports: [],
  templateUrl: './icon-app.html',
  styleUrl: './icon-app.css',
})
export class IconApp {
  @Input()
  theme: 'dark' | 'light' = 'dark';

  @Input()
  size: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
}