import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Type,
} from '@angular/core';

import { NgComponentOutlet } from '@angular/common';

import { CxpIconPhone } from '../cxp-icon-phone/cxp-icon-phone';
import { CxpIconEmail } from '../cxp-icon-email/cxp-icon-email';
import { CxpIconMobile } from '../cxp-icon-mobile/cxp-icon-mobile';

@Component({
  selector: 'cxp-icon',
  standalone: true,
  imports: [
    NgComponentOutlet,
  ],
  template: `
    @if (iconComponent) {
      <ng-container
        *ngComponentOutlet="iconComponent"
      ></ng-container>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CxpIcon {
  @Input()
  name: string | null = null;

  private readonly icons: Record<string, Type<unknown>> = {
    mobile: CxpIconMobile,
    phone: CxpIconPhone,
    email: CxpIconEmail,
  };

  get iconComponent(): Type<unknown> | null {
    if (!this.name) {
      return null;
    }

    const iconName = this.name
      .trim()
      .toLowerCase();

    return this.icons[iconName] ?? null;
  }
}