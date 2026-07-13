import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'cxp-icon-home-nav',
  standalone: true,
  imports: [NgClass],
  templateUrl: './cxp-icon-home-nav.html',
  styleUrl: './cxp-icon-home-nav.css',
})
export class CxpIconHomeNav {
  @Input() theme: 'dark' | 'light' = 'dark';
  @Input() fill: 'filled' | 'outline' = 'filled';
  @Input() size: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'sm';
}