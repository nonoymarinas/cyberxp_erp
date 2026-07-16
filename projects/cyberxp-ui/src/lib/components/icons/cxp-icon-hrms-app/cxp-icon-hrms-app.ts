import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'cxp-icon-hrms-app',
  standalone: true,
  imports: [NgClass],
  templateUrl: './cxp-icon-hrms-app.html',
  styleUrl: './cxp-icon-hrms-app.css',
})
export class CxpIconHrmsApp {
  @Input() theme: 'dark' | 'light' = 'dark';
  @Input() fill: 'filled' | 'outline' = 'filled';
  // @Input() size:'sm' | 'md' | 'lg' | 'xl' = 'md';
}