import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'cxp-icon-user-circle',
  standalone: true,
  imports: [NgClass],
  templateUrl: './cxp-icon-user-circle.html',
  styleUrl: './cxp-icon-user-circle.css',
})
export class CxpIconUserCircle {
  @Input() theme: 'dark' | 'light' = 'dark';
  @Input() fill: 'filled' | 'outline' = 'filled';
  @Input() size: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'sm';
}