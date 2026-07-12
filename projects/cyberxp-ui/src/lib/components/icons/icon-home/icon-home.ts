import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-home',
  standalone: true,
  imports: [NgClass],
  templateUrl: './icon-home.html',
  styleUrl: './icon-home.css',
})
export class IconHome {
  @Input() theme: 'dark' | 'light' = 'dark';
  @Input() fill: 'filled' | 'outline' = 'filled';
  @Input() size: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'sm';
}