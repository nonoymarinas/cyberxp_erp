import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'cxp-icon-user-nav',
  standalone: true,
  imports: [NgClass],
  templateUrl: './cxp-icon-user-nav.html',
  styleUrl: './cxp-icon-user-nav.css',
})
export class CxpIconUserNav {
  @Input() theme: 'dark' | 'light' = 'dark';
  @Input() fill: 'filled' | 'outline' = 'filled';
  @Input() size: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'sm';
}