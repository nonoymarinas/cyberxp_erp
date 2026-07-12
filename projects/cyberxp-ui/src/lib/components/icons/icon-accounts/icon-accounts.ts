import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-accounts',
  standalone: true,
  imports: [NgClass],
  templateUrl: './icon-accounts.html',
  styleUrl: './icon-accounts.css',
})
export class IconAccounts {
  @Input() theme: 'dark' | 'light' = 'dark';
  @Input() fill: 'filled' | 'outline' = 'filled';
  @Input() size: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'sm';
}