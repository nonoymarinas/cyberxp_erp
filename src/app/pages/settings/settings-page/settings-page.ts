import {
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';

import {
  CxpIconUserCircle,
  CxpButton,
  CxpIconSettingsNav,
  CxpIconThemeNav,
  CxpInputSelect,
  CxpSelectOption,
} from 'cyberxp-ui';

type ThemeClass =
  | 'theme-dark'
  | 'theme-light'
  | 'theme-dark-blue';

@Component({
  selector: 'ams-settings-page',
  standalone: true,
  imports: [
    CxpIconUserCircle,
    CxpButton,
    CxpIconSettingsNav,
    CxpIconThemeNav,
    CxpInputSelect,
  ],
  templateUrl: './settings-page.html',
  styleUrl: './settings-page.css',
})
export class SettingsPage implements OnInit {
  @Output() edit = new EventEmitter<void>();

  readonly themeOptions: CxpSelectOption[] = [
    {
      label: 'Dark',
      value: 'theme-dark',
    },
    {
      label: 'Light',
      value: 'theme-light',
    },
    {
      label: 'Dark Blue',
      value: 'theme-dark-blue',
    },
  ];

  selectedTheme: ThemeClass = 'theme-dark';

  private readonly themeClasses: ThemeClass[] = [
    'theme-dark',
    'theme-light',
    'theme-dark-blue',
  ];

  ngOnInit(): void {
    this.loadTheme();
  }

  onThemeChange(
    value: string | number | null,
  ): void {
    if (this.isThemeClass(value)) {
      this.selectedTheme = value;
    }
  }

  applyTheme(): void {
    document.body.classList.remove(
      ...this.themeClasses,
    );

    document.body.classList.add(
      this.selectedTheme,
    );

    localStorage.setItem(
      'cxp-theme',
      this.selectedTheme,
    );
  }

  private loadTheme(): void {
    const savedTheme =
      localStorage.getItem('cxp-theme');

    if (this.isThemeClass(savedTheme)) {
      this.selectedTheme = savedTheme;
      this.applyTheme();
      return;
    }

    const currentBodyTheme =
      this.themeClasses.find((themeClass) =>
        document.body.classList.contains(
          themeClass,
        ),
      );

    if (currentBodyTheme) {
      this.selectedTheme = currentBodyTheme;
      return;
    }

    this.applyTheme();
  }

  private isThemeClass(
    value: unknown,
  ): value is ThemeClass {
    return (
      typeof value === 'string' &&
      this.themeClasses.includes(
        value as ThemeClass,
      )
    );
  }
}