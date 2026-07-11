import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-cyberxp',
  standalone: true,
  imports: [NgClass],
  templateUrl: './icon-cyberxp.html',
  styleUrl: './icon-cyberxp.css',
})
export class IconCyberxp {
  @Input() theme: 'dark' | 'light' = 'dark';
  @Input() fill: 'filled' | 'outline' = 'filled';
  @Input() size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
}