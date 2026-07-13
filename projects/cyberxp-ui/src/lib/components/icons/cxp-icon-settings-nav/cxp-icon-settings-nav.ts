import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'cxp-icon-settings-nav',
  standalone: true,
  imports: [NgClass],
  templateUrl: './cxp-icon-settings-nav.html',
  styleUrl: './cxp-icon-settings-nav.css',
})
export class CxpIconSettingsNav {
  @Input() theme: 'dark' | 'light' = 'dark';
  @Input() fill: 'filled' | 'outline' = 'filled';
  @Input() size: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'sm';
}