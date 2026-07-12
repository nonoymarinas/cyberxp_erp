import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-user-circle',
  standalone: true,
  imports: [NgClass],
  templateUrl: './icon-user-circle.html',
  styleUrl: './icon-user-circle.css',
})
export class IconUserCircle {
  @Input() theme: 'dark' | 'light' = 'dark';
  @Input() fill: 'filled' | 'outline' = 'filled';
  @Input() size: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'sm';
}