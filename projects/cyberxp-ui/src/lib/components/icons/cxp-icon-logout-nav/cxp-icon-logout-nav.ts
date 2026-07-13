import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'cxp-icon-logout-nav',
  standalone: true,
  imports: [NgClass],
  templateUrl: './cxp-icon-logout-nav.html',
  styleUrl: './cxp-icon-logout-nav.css',
})
export class CxpIconLogoutNav {
  @Input() theme: 'dark' | 'light' = 'dark';
  @Input() fill: 'filled' | 'outline' = 'filled';
  @Input() size: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'sm';
}