import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'cxp-icon-cyberxp-app',
  standalone: true,
  imports: [NgClass],
  templateUrl: './cxp-icon-cyberxp-app.html',
  styleUrl: './cxp-icon-cyberxp-app.css',
})
export class CxpIconCyberxpApp {
  @Input() theme: 'dark' | 'light' = 'dark';
  @Input() fill: 'filled' | 'outline' = 'filled';
  @Input() size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
}