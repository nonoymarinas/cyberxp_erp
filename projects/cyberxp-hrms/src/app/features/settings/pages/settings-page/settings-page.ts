import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import {
  CxpButton,
  CxpIconThemeNav,
  CxpInputSelect,
  CxpSelectOption,
} from 'cyberxp-ui';

type ThemeClass = 'theme-dark' | 'theme-light' | 'theme-dark-blue' | 'theme-neutral-red';

@Component({
  selector: 'ams-settings-page',
  standalone: true,
  imports: [CxpButton, CxpIconThemeNav, CxpInputSelect],
  templateUrl: './settings-page.html',
  styleUrl: './settings-page.css',
})
export class SettingsPage implements OnInit {
  @Output() edit = new EventEmitter<void>();

  readonly themeOptions: CxpSelectOption[] = [
    {
      value: 'theme-dark',
      label: 'Dark Mode',
    },
    {
  
      value: 'theme-light',
      label: 'Light Mode',
    },
    {
   
      value: 'theme-dark-blue',
      label: 'Dark Blue',
    },
    {
    
      value: 'theme-neutral-red',
      label: 'Dark Red',
    },
  ];

  selectedTheme: ThemeClass = 'theme-dark';

  private readonly themeClasses: ThemeClass[] = [
    'theme-dark',
    'theme-light',
    'theme-dark-blue',
    'theme-neutral-red',
  ];

  ngOnInit(): void {
    this.loadTheme();
  }

  onThemeChange(value: string | number | null): void {
    if (this.isThemeClass(value)) {
      this.selectedTheme = value;
    }
  }

  applyTheme(): void {
    document.body.classList.remove(...this.themeClasses);

    document.body.classList.add(this.selectedTheme);

    localStorage.setItem('cxp-theme', this.selectedTheme);
  }

  private loadTheme(): void {
    const savedTheme = localStorage.getItem('cxp-theme');

    if (this.isThemeClass(savedTheme)) {
      this.selectedTheme = savedTheme;
      this.applyTheme();
      return;
    }

    const currentBodyTheme = this.themeClasses.find((themeClass) =>
      document.body.classList.contains(themeClass),
    );

    if (currentBodyTheme) {
      this.selectedTheme = currentBodyTheme;
      return;
    }

    this.applyTheme();
  }

  private isThemeClass(value: unknown): value is ThemeClass {
    return typeof value === 'string' && this.themeClasses.includes(value as ThemeClass);
  }
}
