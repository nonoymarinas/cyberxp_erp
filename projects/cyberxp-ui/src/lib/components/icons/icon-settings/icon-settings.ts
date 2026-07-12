import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-settings',
  standalone: true,
  imports: [NgClass],
  templateUrl: './icon-settings.html',
  styleUrl: './icon-settings.css',
})
export class IconSettings {
  @Input() theme: 'dark' | 'light' = 'dark';
  @Input() fill: 'filled' | 'outline' = 'filled';
  @Input() size: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'sm';
}